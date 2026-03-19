import React, { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
    children,
    sparkColor = '#fff',
    sparkSize = 10,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
}) => {
    const canvasRef = useRef(null);
    const sparksRef = useRef([]);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const easeOutQuart = (x) => {
        return 1 - Math.pow(1 - x, 4);
    };

    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 3);
    };

    const draw = useCallback((timestamp) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparksRef.current = sparksRef.current.filter((spark) => {
            const elapsed = timestamp - spark.startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing === 'ease-out' ? easeOutQuart(progress) : easeOutCubic(progress);

            const distance = spark.radius * easedProgress;
            const x = spark.x + Math.cos(spark.angle) * distance;
            const y = spark.y + Math.sin(spark.angle) * distance;

            ctx.beginPath();
            ctx.fillStyle = sparkColor;
            const size = sparkSize * (1 - easedProgress) * extraScale;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();

            return progress < 1;
        });

        if (sparksRef.current.length > 0) {
            requestAnimationFrame(draw);
        }
    }, [duration, easing, sparkColor, sparkSize, extraScale]);

    const handleClick = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (i * 2 * Math.PI) / sparkCount,
            radius: sparkSize * 5,
            startTime: performance.now(),
        }));

        if (sparksRef.current.length === 0) {
            requestAnimationFrame(draw);
        }

        sparksRef.current.push(...newSparks);
    }, [sparkCount, sparkSize, draw]);

    return (
        <div
            className="click-spark-container"
            onClick={handleClick}
            style={{ position: 'relative', width: '100%', height: '100%' }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            />
            {children}
        </div>
    );
};

export default ClickSpark;
