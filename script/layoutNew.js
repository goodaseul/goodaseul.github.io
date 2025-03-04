const headerHeight = document.querySelector(".header").clientHeight;
const navigationLinks = document.querySelectorAll("nav li a");
const sections = document.querySelectorAll(".l_main .section");

window.addEventListener("load", () => {
    initScrollMagic();
    initTabs();
    updateActiveMenu();
    attachEventListeners();

    initTexts(pTag1, textArr1);
    initTexts(pTag2, textArr1);
    window.addEventListener("scroll", scrollHandler);
    maruqueeAnimate();
});

function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").split("#")[1];
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        window.scroll({
            behavior: "smooth",
            top: targetSection.offsetTop - headerHeight,
        });
    }
}

function updateActiveMenu() {
    let index = sections.length;
    while (--index && window.scrollY < sections[index].offsetTop - headerHeight) {}

    document.querySelectorAll("nav li").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll("nav li")[index].classList.add("active");
}

// visual 이미지 롤링
function initImageChange() {
    let currentIndex = 0;
    const images = document.querySelectorAll(".section_intro .wrap_img img");

    setInterval(() => {
        images.forEach((img) => img.classList.remove("active"));
        images[currentIndex].classList.add("active");
        currentIndex = (currentIndex + 1) % images.length;
    }, 3000);
}

// tab
function initTabs() {
    const tabs = document.querySelectorAll(".tab li");
    const contents = document.querySelectorAll(".wrap_tab_cont .box");
    const status = document.querySelector(".wrap_about .tit .status");

    tabs.forEach((tab, index) => {
        if (index === 0) status.innerText = tab.innerText;

        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            contents.forEach((c) => c.classList.remove("active"));
            contents[index].classList.add("active");
            status.innerText = tab.innerText;
        });
    });
}

// marquee
const pTag1 = document.querySelector(".marquee_top .marquee_txt");
const pTag2 = document.querySelector(".marquee_bottom .marquee_txt");

const textArr1 = "positive, punctuality, newness, lively, harmony, meticulous, laugh, be active, positive, punctuality, newness, lively, harmony, meticulous, laugh, be active, ".split(" ");

let count1 = 0;
let count2 = 0;

function initTexts(element, textArray) {
    textArray.push(...textArray);
    for (let i = 0; i < textArray.length; i++) {
        element.innerText += `${textArray[i]}\u00A0`;
    }
}

function marqueeText(count, element, direction) {
    if (count > element.scrollWidth / 2) {
        element.style.transform = `translate3d(0, 0, 0)`;
        count = 0;
    }
    element.style.transform = `translate3d(${direction * count}px, 0, 0)`;

    return count;
}

function maruqueeAnimate() {
    count1++;
    count2++;
    count1 = marqueeText(count1, pTag1, -1);
    count2 = marqueeText(count2, pTag2, 1);
    window.requestAnimationFrame(maruqueeAnimate);
}

function scrollHandler() {
    count1 += 5;
    count2 += 5;
}

// scroll
function initScrollMagic() {
    const controller = new ScrollMagic.Controller();
    document.querySelectorAll(".effect").forEach((item) => {
        new ScrollMagic.Scene({ triggerElement: item, offset: "-30%" })
            .setTween(TweenMax.from(item, 0.5, { opacity: 0, y: 10 }))
            .addTo(controller)
            .setClassToggle(item, "active");
    });
}

function handleScroll() {
    updateActiveMenu();
    updateScrollEffects();
}

// work 높이 값 설정
function updateScrollEffects() {
    document.querySelectorAll(".section_work").forEach((section, index) => {
        const pos = window.scrollY;
        const per = Math.floor(((pos - section.offsetTop) / (section.clientHeight - window.innerHeight)) * 100);
        section.querySelector(".section_tit > p").style.setProperty("--_p", pos >= section.offsetTop ? `${Math.min(per, 100)}%` : "0%");
    });

    const body = document.querySelector("body");
    const quick = document.querySelector(".quick");
    const logo = document.querySelector(".logo");

    const sectionAbout = document.querySelector(".section_about");
    const sectionWork = document.querySelectorAll(".section_work");

    if (window.scrollY >= sectionAbout.previousElementSibling.offsetHeight - sectionAbout.offsetTop) {
        quick.classList.add("on");
    } else {
        quick.classList.remove("on");
    }

    if (window.scrollY >= sectionWork[0].offsetTop - headerHeight) {
        body.classList.replace("white_in", "yellow_in");
    } else {
        body.classList.remove("yellow_in");
    }

    if (window.scrollY >= sectionWork[1].offsetTop - headerHeight) {
        body.classList.replace("yellow_in", "white_in");
    } else {
        body.classList.remove("white_in");
    }

    if (window.scrollY + window.innerHeight >= sectionWork[1].offsetTop + sectionWork[1].offsetHeight) {
        logo.style.opacity = "0";
        logo.style.pointerEvents = "none";
        quick.classList.add("fix");
    } else {
        logo.style.opacity = "1";
        logo.style.pointerEvents = "all";
        logo.style.transition = "all .3s";
        quick.classList.remove("fix");
    }
}

function attachEventListeners() {
    window.addEventListener("scroll", handleScroll);
    navigationLinks.forEach((link) => link.addEventListener("click", handleNavClick));
}
