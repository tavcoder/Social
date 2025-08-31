import { useState, useEffect, useRef } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";

const Carousel = ({ images = [], interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        if (images.length === 0 || isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval, isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // --- SWIPE HANDLERS ---
    const handleTouchStart = (e) => {
        setIsPaused(true); // pausa mientras toca
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) {
            nextSlide();
        } else if (distance < -50) {
            prevSlide();
        }

        touchStartX.current = 0;
        touchEndX.current = 0;

        setIsPaused(false); // reanuda autoplay después del swipe
    };

    if (images.length === 0) return null;

    return (
        <div
            className="carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index}`}
                    className={`carousel-image ${index === currentIndex ? "active" : ""}`}
                />
            ))}

            <button className="carousel-btn prev" onClick={prevSlide}>
                <CaretLeft size={24} weight="bold" />
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
                <CaretRight size={24} weight="bold" />
            </button>

            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
