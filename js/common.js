let blackUser = true;
let blackLocation = [];
let whiteLocation = [];

function setLocation(classArr) {
    for (let item of classArr) {
        if (item.includes("-")) {
            return Number(item.split("-")[1]);
        }
    }
}

function continuity(arr, num) {
    let subCount = 1;
    let newNum = num;
    let newArr = arr.slice(0);
    for (let i = 0; i < newArr.length; i++) {
        if (subCount > 4) {
            return true
        }
        newNum = num;
        subCount = 1;
        for (let j = 1; j < newArr.length; j++) {
            if (newArr[i] + newNum === newArr[j]) {
                newArr.splice(j, 1);
                subCount += 1
                newNum = num * subCount;
                j = 0;
            }
        }
    }
    return false;
}

function checkedFive(arr, location) {
    arr.push(location);
    arr = arr.sort((x, y) => {
        return x - y;
    });
    if (continuity(arr, 1) || continuity(arr, 14) || continuity(arr, 15) || continuity(arr, 16)) {
        return true;
    } 
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.col').forEach(function (element) {
        element.addEventListener('click', function (event) {
            let col = setLocation(Array.from(element.classList));
            let row = setLocation(Array.from(element.closest('.row').classList));
            let location = (row - 1) * 15 + col;
            if (element.classList.contains("white") || element.classList.contains("black")) {
                alert("이미 돌이 있습니다.");
                return;
            }
            if (blackUser) {
                element.classList.add("black");
                blackUser = false;
                if (checkedFive(blackLocation, location)) {
                    alert("흑돌이 이겼습니다.");
                }
            } else {
                element.classList.add("white");
                blackUser = true;
                if (checkedFive(whiteLocation, location)) {
                    alert("백돌이 이겼습니다.");
                }
            };
        })
    })
})