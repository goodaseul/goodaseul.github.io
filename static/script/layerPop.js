const target = document.querySelectorAll(".link_view");
let popup = document.querySelector(".popup_layer");
let targetID;
let content = document.createElement("div");

// 팝업 오픈
window.onload = function () {
    target.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            document.querySelector("body").style.overflowY = "hidden";
            document.getElementById("popuplayer").style.display = "block";
            content.innerHTML = `
            <img src="/static/images/pr/pr_img_${index + 1}.png" alt="">
            `;
            document.getElementById("popuplayer").append(content);
        });
    });

    const closeBtn = document.querySelector(".popup_btn");
    closeBtn.addEventListener("click", function () {
        document.querySelector("body").style.overflowY = "auto";
        content.remove();
        popup.style.display = "none";
    });
};
