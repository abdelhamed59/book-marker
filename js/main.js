let siteName = document.getElementById(`SiteName`);
let siteUrl = document.getElementById(`SiteURL`);
let myBtn = document.getElementById(`myBtn`)
let boxError = document.querySelector(`.errorMessage`)
let boxBtn = document.querySelector(`#boxError`)
let sitList = [];
if (localStorage.getItem(`site`) == null) {
    sitList = [];
} else {
    sitList = JSON.parse(localStorage.getItem(`site`));
    displaySites(sitList);
}


function validateSiteName() {
    let validIvon = document.getElementById(`validIcon`)
    let inValidIcon = document.getElementById(`inValidIcon`)
    var regex = /^([a-z]|[A-Z]| |[1-9]){3,50}$/gmi;
    if (regex.test(siteName.value) == true) {
        document.getElementById(`validIcon`).classList.remove(`d-none`)
        document.getElementById(`inValidIcon`).classList.add(`d-none`)


        return true
    } else if (siteName.value == ``) {
        document.getElementById(`validIcon`).classList.add(`d-none`)
        document.getElementById(`inValidIcon`).classList.add(`d-none`)
        return false
    } else {
        document.getElementById(`validIcon`).classList.add(`d-none`)
        document.getElementById(`inValidIcon`).classList.remove(`d-none`)
    }
}


function validateSiteURL() {
    let validURL = document.getElementById(`validURL`)
    let inValidURL = document.getElementById(`inValidURL`)
    var regex = /^(www\.([a-z]|[A-Z]|[1-9]){3,10}\.com)$/gmi;
    if (regex.test(siteUrl.value) == true) {
        document.getElementById(`validURL`).classList.remove(`d-none`)
        document.getElementById(`inValidURL`).classList.add(`d-none`)
        document.getElementById(`wrongSiteURL`).classList.add(`d-none`)



        return true
    } else if (siteUrl.value == ``) {
        document.getElementById(`validURL`).classList.add(`d-none`)
        document.getElementById(`inValidURL`).classList.add(`d-none`)
        document.getElementById(`wrongSiteURL`).classList.add(`d-none`)

        return false
    } else {
        document.getElementById(`validURL`).classList.add(`d-none`)
        document.getElementById(`inValidURL`).classList.remove(`d-none`)
        document.getElementById(`wrongSiteURL`).classList.remove(`d-none`)
    }
}

function addSites() {
    if (validateSiteName() == true && validateSiteURL() == true) {
        let site = {
            siteName: siteName.value,
            siteURL: siteUrl.value
        }
        sitList.push(site);
        localStorage.setItem(`site`, JSON.stringify(sitList))
        displaySites()
        clear()
    } else { boxError.classList.replace(`d-none`, `d-flex`) }
}

function displaySites() {
    let cartona = ``
    for (let i = 0; i < sitList.length; i++) {
        cartona += ` <tr>
        <td>${i + 1}</td>
        <td>${sitList[i].siteName}</td>
        <td><button class="visitBtn"><a href="http://${sitList[i].siteURL}" target="blank"><i class="fa-solid fa-eye fa-fade fa-xs"></i> Visit</a></button></td>
        <td><button class="deletBtn" onclick="deletSite(${i})">DELET</button></td>
    </tr>`

    }
    document.getElementById(`tBody`).innerHTML = cartona
}
function clear() {
    siteName.value = ``
    siteUrl.value = ``
    document.getElementById(`validURL`).classList.add(`d-none`)
    document.getElementById(`inValidURL`).classList.add(`d-none`)
    document.getElementById(`validIcon`).classList.add(`d-none`)
    document.getElementById(`inValidIcon`).classList.add(`d-none`)
}

function deletSite(index) {
    sitList.splice(index, 1);
    localStorage.setItem(`site`, JSON.stringify(sitList));
    displaySites()


}
function boxErrorBtn() {
    boxError.classList.replace(`d-flex`, `d-none`)

}



boxBtn.addEventListener(`click`, boxErrorBtn)
document.addEventListener("keyup", function (e) {
    if (boxError.classList.contains(`d-flex`)) {
        switch (e.key) {
            case `Enter`:
                boxErrorBtn()
                break;



        }
    }else{
        switch (e.key) {
            case `Enter`:
                addSites()
                break;
        }
    }

})


