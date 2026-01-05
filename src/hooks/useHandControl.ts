import { useEffect, useRef, useState, useCallback } from 'react';
import { initHandTracking, initFaceTracking } from '../utils/handTracking';
import { HandLandmarkerResult, FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export interface HandData {
    x: number;
    y: number;
    isPinching: boolean;
    isHolding: boolean;
}

export const useHandControl = () => {
    const [isActive, setIsActive] = useState(false);
    const [leftHand, setLeftHand] = useState<HandData | null>(null);
    const [rightHand, setRightHand] = useState<HandData | null>(null);
    const [scrollDelta, setScrollDelta] = useState(0);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const requestRef = useRef<number | null>(null);
    const lastRightHandRef = useRef<HandData | null>(null);
    const lastHoveredElementRef = useRef<Element | null>(null);

    const detectGestures = (result: HandLandmarkerResult) => {
        const hands = result.landmarks;
        const handedness = result.handedness;

        let newLeft: HandData | null = null;
        let newRight: HandData | null = null;

        hands.forEach((landmarks, index) => {
            const isRight = handedness[index][0].categoryName === 'Right';

            // Index tip (8) and Thumb tip (4) for pinching
            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            const distance = Math.sqrt(
                Math.pow(thumbTip.x - indexTip.x, 2) +
                Math.pow(thumbTip.y - indexTip.y, 2)
            );

            const handData: HandData = {
                x: 1 - landmarks[9].x, // Middle finger base, mirrored
                y: landmarks[9].y,
                isPinching: distance < 0.05,
                isHolding: distance < 0.04
            };

            if (isRight) newRight = handData;
            else newLeft = handData;
        });

        // Scale coordinates to make full screen accessible
        // Camera sees limited area, but we want full screen control
        const scaleCoordinate = (value: number, scale: number = 1.5, offset: number = -0.25) => {
            return Math.max(0, Math.min(1, value * scale + offset));
        };

        if (newLeft) {
            newLeft = {
                ...newLeft,
                x: scaleCoordinate(newLeft.x),
                y: scaleCoordinate(newLeft.y)
            };
        }

        if (newRight) {
            newRight = {
                ...newRight,
                x: scaleCoordinate(newRight.x),
                y: scaleCoordinate(newRight.y)
            };
        }

        setLeftHand(newLeft);
        setRightHand(newRight);

        // Scroll detection: only right hand (blue) - based on absolute position
        if (newRight) {
            const handY = newRight.y; // 0 = top, 1 = bottom

            // Define zones
            const topZone = 0.35;      // Above 35% = scroll up
            const bottomZone = 0.65;   // Below 65% = scroll down
            // Between 35-65% = middle zone (no scroll)

            if (handY < topZone) {
                // Hand is at top - scroll UP
                const intensity = (topZone - handY) / topZone; // 0 to 1
                const targetDelta = -intensity * 120; // Increased to 120 for faster scroll
                // Smooth the delta to reduce jitter (increased smoothing like cursor)
                const smoothedDelta = scrollDelta * 0.85 + targetDelta * 0.15;
                setScrollDelta(smoothedDelta);
                console.log('🔵 Right hand UP:', { handY, intensity, targetDelta, smoothedDelta });
            } else if (handY > bottomZone) {
                // Hand is at bottom - scroll DOWN
                const intensity = (handY - bottomZone) / (1 - bottomZone); // 0 to 1
                const targetDelta = intensity * 120; // Increased to 120 for faster scroll
                // Smooth the delta to reduce jitter (increased smoothing like cursor)
                const smoothedDelta = scrollDelta * 0.85 + targetDelta * 0.15;
                setScrollDelta(smoothedDelta);
                console.log('🔵 Right hand DOWN:', { handY, intensity, targetDelta, smoothedDelta });
            } else {
                // Hand is in middle - STOP
                setScrollDelta(0);
                console.log('🔵 Right hand MIDDLE (stopped)');
            }

            lastRightHandRef.current = newRight;
        } else {
            setScrollDelta(0);
            lastRightHandRef.current = null;
        }
    };

    const drawHandsOnCanvas = (handResult: HandLandmarkerResult, faceResult: FaceLandmarkerResult | null) => {
        if (!canvasRef.current || !videoRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // Fill with black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw face contour if detected
        if (faceResult && faceResult.faceLandmarks && faceResult.faceLandmarks.length > 0) {
            const faceLandmarks = faceResult.faceLandmarks[0];

            // Face contour indices (outline of face)
            const faceOvalIndices = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

            ctx.strokeStyle = '#00F5FF';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00F5FF';

            ctx.beginPath();
            faceOvalIndices.forEach((index, i) => {
                const point = faceLandmarks[index];
                const x = point.x * canvas.width;
                const y = point.y * canvas.height;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.stroke();
        }

        // Draw hand landmarks
        if (handResult.landmarks) {
            for (let i = 0; i < handResult.landmarks.length; i++) {
                const landmarks = handResult.landmarks[i];
                const isRight = handResult.handedness[i][0].categoryName === 'Right';

                // Draw connections
                ctx.strokeStyle = isRight ? '#00F5FF' : '#FF006E';
                ctx.lineWidth = 3;
                ctx.shadowBlur = 10;
                ctx.shadowColor = isRight ? '#00F5FF' : '#FF006E';

                const connections = [
                    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
                    [0, 5], [5, 6], [6, 7], [7, 8], // Index
                    [0, 9], [9, 10], [10, 11], [11, 12], // Middle
                    [0, 13], [13, 14], [14, 15], [15, 16], // Ring
                    [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
                    [5, 9], [9, 13], [13, 17] // Palm
                ];

                connections.forEach(([start, end]) => {
                    ctx.beginPath();
                    ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height);
                    ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height);
                    ctx.stroke();
                });

                // Draw landmarks
                landmarks.forEach((landmark) => {
                    ctx.fillStyle = isRight ? '#00F5FF' : '#FF006E';
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = isRight ? '#00F5FF' : '#FF006E';
                    ctx.beginPath();
                    ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 4, 0, 2 * Math.PI);
                    ctx.fill();
                });
            }
        }

        // Reset shadow
        ctx.shadowBlur = 0;
    };

    const processVideo = useCallback(async () => {
        const handLandmarker = await initHandTracking();
        const faceLandmarker = await initFaceTracking();

        if (videoRef.current && handLandmarker && videoRef.current.readyState >= 2) {
            const startTimeMs = performance.now();
            const handResults = handLandmarker.detectForVideo(videoRef.current, startTimeMs);
            detectGestures(handResults);

            // Detect face
            let faceResults: FaceLandmarkerResult | null = null;
            if (faceLandmarker) {
                faceResults = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);
            }

            drawHandsOnCanvas(handResults, faceResults);
        }
        requestRef.current = requestAnimationFrame(processVideo);
    }, []);

    const toggle = async () => {
        if (isActive) {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
            setIsActive(false);
            setLeftHand(null);
            setRightHand(null);
            setScrollDelta(0);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (!videoRef.current) {
                    videoRef.current = document.createElement('video');
                }
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsActive(true);
                requestRef.current = requestAnimationFrame(processVideo);
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        }
    };

    // Continuous scrolling with ref to avoid re-creating animation loop
    const scrollAnimationRef = useRef<number | null>(null);
    const scrollDeltaRef = useRef<number>(0);

    // Update ref when scrollDelta changes
    useEffect(() => {
        scrollDeltaRef.current = scrollDelta;
    }, [scrollDelta]);

    useEffect(() => {
        const scroll = () => {
            if (scrollDeltaRef.current !== 0) {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo(0, currentScroll + scrollDeltaRef.current);
                console.log('📜 Scrolling:', scrollDeltaRef.current);
            }
            scrollAnimationRef.current = requestAnimationFrame(scroll);
        };

        if (isActive) {
            console.log('🟢 Starting scroll animation loop');
            scrollAnimationRef.current = requestAnimationFrame(scroll);
        }

        return () => {
            if (scrollAnimationRef.current) {
                console.log('🔴 Stopping scroll animation loop');
                cancelAnimationFrame(scrollAnimationRef.current);
            }
        };
    }, [isActive]); // Only depend on isActive

    // Handle click simulation - only left hand (red)
    const lastClickTimeRef = useRef<number>(0);
    const isClickingRef = useRef<boolean>(false);

    useEffect(() => {
        if (leftHand?.isHolding && !isClickingRef.current) {
            const now = Date.now();
            // Debounce clicks - minimum 500ms between clicks
            if (now - lastClickTimeRef.current < 500) {
                return;
            }

            isClickingRef.current = true;

            const x = leftHand.x * window.innerWidth;
            const y = leftHand.y * window.innerHeight;

            console.log('🔴 Left hand click attempt at:', { x, y, isHolding: leftHand.isHolding });

            const element = document.elementFromPoint(x, y);
            if (element) {
                console.log('🎯 Clicking element:', element.tagName, element.className);

                // Simulate full mouse event sequence
                const mouseDownEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y
                });

                const mouseUpEvent = new MouseEvent('mouseup', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y
                });

                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y
                });

                element.dispatchEvent(mouseDownEvent);
                setTimeout(() => {
                    element.dispatchEvent(mouseUpEvent);
                    element.dispatchEvent(clickEvent);

                    // Focus inputs
                    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                        element.focus();
                    }
                }, 50);

                lastClickTimeRef.current = now;
            } else {
                console.log('❌ No element found at position');
            }
        } else if (!leftHand?.isHolding) {
            isClickingRef.current = false;
        }
    }, [leftHand?.isHolding, leftHand?.x, leftHand?.y]);

    // Handle hover effects - trigger mouseenter/mouseleave
    useEffect(() => {
        if (leftHand && isActive) {
            const x = leftHand.x * window.innerWidth;
            const y = leftHand.y * window.innerHeight;
            const element = document.elementFromPoint(x, y);

            // If hovering over a new element
            if (element !== lastHoveredElementRef.current) {
                // Trigger mouseleave on previous element
                if (lastHoveredElementRef.current) {
                    const leaveEvent = new MouseEvent('mouseleave', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    lastHoveredElementRef.current.dispatchEvent(leaveEvent);
                }

                // Trigger mouseenter on new element
                if (element) {
                    const enterEvent = new MouseEvent('mouseenter', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        clientX: x,
                        clientY: y
                    });
                    element.dispatchEvent(enterEvent);

                    // Also dispatch mouseover for better compatibility
                    const overEvent = new MouseEvent('mouseover', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        clientX: x,
                        clientY: y
                    });
                    element.dispatchEvent(overEvent);
                }

                lastHoveredElementRef.current = element;
            }
        } else {
            // Clear hover when hand is not detected
            if (lastHoveredElementRef.current) {
                const leaveEvent = new MouseEvent('mouseleave', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                lastHoveredElementRef.current.dispatchEvent(leaveEvent);
                lastHoveredElementRef.current = null;
            }
        }
    }, [leftHand?.x, leftHand?.y, isActive]);

    return { isActive, leftHand, rightHand, toggle, canvasRef, scrollDelta };
};
