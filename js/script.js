'use strict';

window.addEventListener('DOMContentLoaded', function() {

    let popupOverlay = document.querySelector('.overlay'),
        popup = popupOverlay.querySelector('.popup'),
        popupBtn = document.getElementById('popup-btn'),
        mainPage = document.querySelector('.main'),
        customPage = document.querySelector('.custom'),
        customPageChild = customPage.children;

    popupBtn.addEventListener('click', function() {
        popupOverlay.style.display = 'none';

        showCustomPage();
    });

    function showCustomPage() {
        mainPage.style.display = 'none';
        customPage.style.display = 'flex';

        for (let i = 0; i < customPageChild.length; i++) {
            customPageChild[i].style.display = 'block';
        }

        changeClothes(1, 3);
        changeHair(1, 3);
        changeSkin();
        maleRadio.checked = true;
        sexValue = 'Мужской';
        nameValue.value = '';
        ageValue.value = '';
        bioValue.value = '';
        viewValue.options.selectedIndex = 0;
        view = viewValue.options[0].value;
        checkGender();
    }

    function showMainPage() {
        mainPage.style.display = 'block';
        customPage.style.display = 'none';
    }


    let readyBtn = document.getElementById('ready'),
        cardsWrapper = document.querySelector('.main-cards'),
        newCard;



    readyBtn.addEventListener('click', function() {
        if (nameValue.value == '' || ageValue.value == '' || bioValue.value == '') {
            alert('Заполните все поля!');
        } else {
            showMainPage();
            addNewCard();

            removeExtraCards();
            cardsWrapper.appendChild(newCard);
            nullifyResult();
        }
    });







    let nameValue = document.getElementById('name'),
        ageValue = document.getElementById('age'),
        bioValue = document.getElementById('bio'),
        viewValue = document.getElementById('select'),
        sexBtns = document.querySelectorAll('input[name="sex"]'),
        sexValue = 'Мужской',
        maleRadio = document.getElementById('male');


    let personSkin = document.getElementById('person-skin'),
        personClothes = document.getElementById('person-clothes'),
        personHair = document.getElementById('person-hair'),
        person = document.querySelector('.person');


    let name,
        age,
        bio,
        view = viewValue.options[0].value,
        sex = sexValue;

    sexBtns.forEach(function(sexBtn) {
        sexBtn.addEventListener('click', function() {
            sexValue = this.value;
            sex = this.value;

            checkGender();
        });
    });

    function checkGender() {
        if (sexValue == 'Женский') {
            changeHair(4, 6);
            changeClothes(4, 6);
            changeSkin();
        }

        if (sexValue == 'Мужской') {
            changeHair(1, 3);
            changeClothes(1, 3);
            changeSkin();
        }
    }

    viewValue.addEventListener('change', function() {
        view = this.options[this.selectedIndex].value;
    });

    nameValue.addEventListener('change', function() {
        if (isNaN(this.value)) {
            name = this.value;
        } else {
            alert('Можно вводить только буквы');
            this.value = '';
        }

    });

    ageValue.addEventListener('change', function() {
        if (!isNaN(this.value)) {
            if (this.value >= 24 && this.value < 60) {
                age = this.value;
            } else {
                alert('Неподходящий возраст');
                this.value = '';
            }
        } else {
            alert('Введите только число');
            this.value = '';
        }
    });

    bioValue.addEventListener('change', function() {
        bio = this.value;
    });


    function addNewCard() {
        newCard = document.createElement('div');
        newCard.classList.add('main-cards-item');

        newCard.innerHTML = `
			<div class="candidate-block">
				<div class="photo"></div>
				<div class="result">
					<div class="result-count">65%</div>
					<div class="progress">
						<div class="progress-bar progress-bar-2"></div>
					</div>
				</div>
			</div>
			<div class="name">${name}</div>
			<div class="age">${age} лет</div>
			Пол:
			<div class="sex">${sex}</div>
			Полит. взгляды:
			<div class="views">${view}</div>
			Биография
			<div class="bio">${bio}</div>
        `;

        let photo = newCard.querySelector('.photo');

        photo.appendChild(person);

    }




    function changeClothes(a, b) {
        let clothes = document.querySelector('.clothes'),
            clothesItem = clothes.querySelectorAll('.clothes-style'),
            prev = clothes.querySelector('.prev'),
            next = clothes.querySelector('.next'),
            slideIndex = a,
            min = a,
            max = b;

        showSlide(slideIndex);

        function changeSlide(n) {
            showSlide(slideIndex += n);
        }

        next.addEventListener('click', function() {
            changeSlide(1);
        });
        prev.addEventListener('click', function() {
            changeSlide(-1);
        });

        function showSlide(n) {
            if (n > max) {
                slideIndex = min;
            }
            if (n < min) {
                slideIndex = max;
            }

            clothesItem.forEach(function(item) {
                item.style.display = 'none';
            });

            clothesItem[slideIndex - 1].style.display = 'block';

            personClothes.style.cssText = `
    			background-image: url(./img/clothes/construct/clothes-${slideIndex}.png);
    			`;
        }
    }



    function changeHair(a, b) {
        let hair = document.querySelector('.hair'),
            hairItem = hair.querySelectorAll('.hair-style'),
            prev = hair.querySelector('.prev'),
            next = hair.querySelector('.next'),
            slideIndex = a,
            min = a,
            max = b;

        showSlide(slideIndex);

        function changeSlide(n) {
            showSlide(slideIndex += n);
        }

        next.addEventListener('click', function() {
            changeSlide(1);
        });
        prev.addEventListener('click', function() {
            changeSlide(-1);
        });

        function showSlide(n) {
            if (n > max) {
                slideIndex = min;
            }
            if (n < min) {
                slideIndex = max;
            }

            hairItem.forEach(function(item) {
                item.style.display = 'none';
            });

            hairItem[slideIndex - 1].style.display = 'block';

            personHair.style.cssText = `
    			background-image: url("./img/hair/construct/hair-${slideIndex}.png");
    			`;
        }
    }




    function changeSkin() {
        let skin = document.querySelector('.skin'),
            skinItem = skin.querySelectorAll('.skin-color'),
            prev = skin.querySelector('.prev'),
            next = skin.querySelector('.next'),
            slideIndex = 1;

        showSlide(slideIndex);

        function changeSlide(n) {
            showSlide(slideIndex += n);
        }

        next.addEventListener('click', function() {
            changeSlide(1);
        });
        prev.addEventListener('click', function() {
            changeSlide(-1);
        });

        function showSlide(n) {
            if (n > skinItem.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = skinItem.length;
            }

            skinItem.forEach(function(item) {
                item.style.display = 'none';
            });

            skinItem[slideIndex - 1].style.display = 'block';

            let a;

            if (sexValue == 'Мужской') {
                a = slideIndex;
            }
            if (sexValue == 'Женский') {
                a = slideIndex + 3;
            }


            personSkin.style.cssText = `
            	background-image: url(./img/skin/skin-${a}.png);
            	`;
        }
    }



    function nullifyResult() {

        let results = document.querySelectorAll('.result-count'),
            progressBars = document.querySelectorAll('.progress-bar');

        results.forEach(function(elem) {
            elem.innerHTML = '0%';
        });

        progressBars.forEach(function(elem) {
            elem.className = 'progress-bar';
            elem.style.height = 0;
            elem.closest('.main-cards-item').classList.remove('main-cards-item-active');
        });


        let voteBtn = document.getElementById('voting'),
            crimeBtn = document.getElementById('crime');

        crimeBtn.addEventListener('click', function() {

            let a,
                b,
                c;

            randomNumsArray = [];

            a = Math.round(Math.random() * 100);
            b = Math.round(Math.random() * 100);
            c = 25 + (75 - a - b);

            while (c <= 25) {

                a = Math.round(Math.random() * 100);
                b = Math.round(Math.random() * 100);
                c = 25 + (75 - a - b);

            }
            randomNumsArray.push(a, b, c);



            for (let i = 0; i < 3; i++) {
                results[i].textContent = randomNumsArray[i] + '%';
                progressBars[i].style.height = randomNumsArray[i] + '%';
            }

            let max = Math.max(parseInt(results[0].innerHTML), parseInt(results[1].innerHTML), parseInt(results[2].innerHTML));

            results.forEach(function(elem) {
                let grandpa = elem.closest('.main-cards-item');
                grandpa.classList.remove('main-cards-item-active');
                if (parseInt(elem.innerHTML) == max) {

                    grandpa.classList.add('main-cards-item-active');
                }
            });
        });

        voteBtn.addEventListener('click', function() {
            getRandomNums();
            for (let i = 0; i < 3; i++) {
                results[i].textContent = randomNumsArray[i] + '%';
                progressBars[i].style.height = randomNumsArray[i] + '%';
            }

            let max = Math.max(parseInt(results[0].innerHTML), parseInt(results[1].innerHTML), parseInt(results[2].innerHTML));

            results.forEach(function(elem) {
                let grandpa = elem.closest('.main-cards-item');
                grandpa.classList.remove('main-cards-item-active');
                if (parseInt(elem.innerHTML) == max) {

                    grandpa.classList.add('main-cards-item-active');
                }
            });
        });
    }

    let resetBtn = document.getElementById('reset'),
        personParrent = document.querySelector('.custom-char');

    resetBtn.addEventListener('click', function() {
        showCustomPage();
        personParrent.insertBefore(person, readyBtn);
    });

    function removeExtraCards() {
        let cards = document.querySelectorAll('.main-cards-item');

        if (cards.length >= 3) {
            for (let i = 2; i < cards.length; i++) {
                cardsWrapper.removeChild(cards[i]);
            }
        }
    }

    let randomNumsArray = [];

    function getRandomNums() {
        let a,
            b,
            c;

        randomNumsArray = [];

        a = Math.round(Math.random() * 100);
        b = Math.round(Math.random() * 100);
        c = 100 - a - b;

        while (c <= 0) {

            a = Math.round(Math.random() * 100);
            b = Math.round(Math.random() * 100);
            c = 100 - a - b;

        }
        randomNumsArray.push(a, b, c);
    }






});