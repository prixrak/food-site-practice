function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider
    const prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        currentSlideNum = document.getElementById(currentCounter),
        totalSlideNum = document.getElementById(totalCounter),
        allSlides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container);

    // индекс слайдов
    let slideIndex = 0;

    function totalSlides() {
        let numberOfSlides = allSlides.length;
        if (numberOfSlides < 10) {
            totalSlideNum.textContent = `0${numberOfSlides}`;
            currentSlideNum.textContent = `0${slideIndex}`;
        } else {
            totalSlideNum.textContent = numberOfSlides;
            currentSlideNum.textContent = slideIndex;

        }
    }

    totalSlides();

    slidesField.style.width = 100 * allSlides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all 0.5s ease';

    slidesWrapper.style.overflow = 'hidden';

    allSlides.forEach(slide => {
        slide.style.width = width;
    });

    function changeCurrentSlideNum(index) {
        if (index < 9) {
            currentSlideNum.textContent = `0${index + 1}`;
        } else {
            currentSlideNum.textContent = index + 1;
        }
    }

    changeCurrentSlideNum(slideIndex);


    let offset = 0;
    nextBtn.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (allSlides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == allSlides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }

        changeCurrentSlideNum(slideIndex);
        changeCurrentDot(slideIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (allSlides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 0) {
            slideIndex = allSlides.length - 1;
        } else {
            slideIndex--;
        }

        changeCurrentSlideNum(slideIndex);
        changeCurrentDot(slideIndex);
    });

    // slider indicators
    const indicators = document.createElement('ol'),
        dots = [];

    function changeCurrentDot(index) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index].style.opacity = '1';
    }

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);



    for (let i = 0; i < allSlides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    changeCurrentDot(slideIndex);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo - 1;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            changeCurrentSlideNum(slideIndex);

            changeCurrentDot(slideIndex);
        });
    });


    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


}

   
export default slider;