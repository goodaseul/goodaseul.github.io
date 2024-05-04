// nav
const headerHeight = document.querySelector(".header").clientHeight;
const navigationLink = document.querySelectorAll("nav li");
const navigationLinkA = document.querySelectorAll("nav li a");
const sectors = document.querySelectorAll(".l_main .section");

window.addEventListener("load", function () {
    ActiveMenu();
    window.addEventListener("scroll", ActiveMenu);

    ClickContent();
    window.addEventListener("click", ClickContent);

    // 공통 스크롤 모션
    const controller = new ScrollMagic.Controller({});

    const target = document.querySelectorAll(".effect");

    target.forEach((item, index) => {
        var tween = TweenMax.from(item, 0.5, {
            opacity: 0,
            y: "10",
        });
        var scene = new ScrollMagic.Scene({
            triggerElement: item,
            offset: "-30%",
        })
            .setTween(tween)
            .addTo(controller)
            .setClassToggle(item, "active");
    });

    initTexts(pTag1, textArr1);
    initTexts(pTag2, textArr1);
    window.addEventListener("scroll", scrollHandler);

    maruqueeAnimate();

    imgChange();
});

// 헤더 active
function ClickContent() {
    navigationLinkA.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            let contentHref = e.currentTarget.getAttribute("href").split("#")[1];
            sectors[index].getAttribute(contentHref);
            if (sectors[index].getAttribute("id") == contentHref) {
                window.scroll({
                    behavior: "smooth",
                    top: sectors[index].offsetTop - headerHeight,
                });
            }
        });
    });
}

function ActiveMenu() {
    let len = sectors.length;
    while (--len && window.scrollY < sectors[len].offsetTop - headerHeight) {}

    navigationLink.forEach((item) => item.classList.remove("active"));
    navigationLink[len].classList.add("active");
}

// img change
function imgChange() {
    let roll = 1;
    const myphotoImg = document.querySelectorAll(".section_intro .wrap_img img");
    const imgNum = myphotoImg.length;
    setInterval(function () {
        if (roll < imgNum) {
            roll++;
        } else {
            roll = 1;
        }

        myphotoImg.forEach((item, index) => {
            myphotoImg.forEach((myphoto) => {
                item.classList.remove("active");
            });
            myphotoImg[roll - 1].classList.add("active");
        });
    }, 3000);
}

// 탭
const wrapTab = document.querySelectorAll(".tab li");
const wrapCont = document.querySelectorAll(".wrap_tab_cont .box");
wrapTab.forEach((item, index) => {
    let status = document.querySelector(".wrap_about .tit .status");
    status.innerText = wrapTab[0].innerText;

    item.addEventListener("click", () => {
        wrapTab.forEach((item) => {
            item.classList.remove("active");
        });
        wrapTab[index].classList.add("active");
        wrapCont.forEach((item) => {
            item.classList.remove("active");
        });
        wrapCont[index].classList.add("active");
        status.innerText = wrapTab[index].innerText;
    });
});

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

// work
workTargetScroll("web");
workTargetScroll("promotion");
currentPer("web");
currentPer("promotion");
window.addEventListener("resize", currentPer);

function workTargetScroll(target) {
    const targetSection = document.querySelector(`.l_main .section_${target}`);
    window.addEventListener("scroll", function (e) {
        const pos = window.scrollY;
        let currentPer = Math.floor(((pos - targetSection.offsetTop) / (targetSection.clientHeight - window.innerHeight)) * 100);
        if (pos >= targetSection.offsetTop) {
            targetSection.querySelector(".section_tit > p").style.setProperty("--_p", `${currentPer}%`);
        } else {
            targetSection.querySelector(".section_tit  > p").style.setProperty("--_p", "0%");
        }
    });
}

activeIn();
window.addEventListener("resize", activeIn);

function activeIn() {
    const sectionAbout = document.querySelector(".section_about");
    const sectionWork = document.querySelectorAll(".section_work");
    const bodyContent = document.querySelector("body");
    const logo = document.querySelector(".logo");
    const quick = document.querySelector(".quick");

    window.addEventListener("scroll", function (e) {
        const pos = window.scrollY;
        // quick_in
        if (pos - headerHeight >= sectionAbout.previousElementSibling.offsetHeight - sectionAbout.offsetTop) {
            quick.classList.add("on");
        } else {
            quick.classList.remove("on");
        }
        // yellow_in
        if (pos >= sectionWork[0].offsetTop - headerHeight) {
            bodyContent.classList.remove("white_in");
            bodyContent.classList.add("yellow_in");
        } else {
            bodyContent.classList.remove("yellow_in");
        }
        // white_in
        if (pos >= sectionWork[1].offsetTop - headerHeight) {
            bodyContent.classList.remove("yellow_in");
            bodyContent.classList.add("white_in");
        } else {
            bodyContent.classList.remove("white_in");
        }
        // footer_in
        if (pos + window.innerHeight >= sectionWork[1].offsetTop + sectionWork[1].offsetHeight) {
            logo.style.cssText = `opacity: 0; point-event: none;`;
            quick.classList.add("fix");
        } else {
            logo.style.cssText = `opacity: 1; point-event: all; transition: all .3s`;
            quick.classList.remove("fix");
        }
    });
}

function currentPer(target) {
    let targetTit;

    window.addEventListener("scroll", function (e) {
        let result, valuePer;
        if (target == "web") {
            targetTit = document.querySelector(`.l_main .section_${target} .section_tit > p`);
            valuePer = getComputedStyle(targetTit).getPropertyValue("--_p");
            const value = valuePer.replace("%", "");
            result = value > 100 ? targetTit.style.setProperty("--_p", "100%") : false;
        } else if (target == "promotion") {
            targetTit = document.querySelector(`.l_main .section_${target} .section_tit  > p`);
            valuePer = getComputedStyle(targetTit).getPropertyValue("--_p");
            const value = valuePer.replace("%", "");
            result = value > 100 ? targetTit.style.setProperty("--_p", "100%") : false;
        }
    });
}
