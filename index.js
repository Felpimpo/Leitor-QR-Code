const wrapper =  document.querySelector(".wrapper");
const form = document.querySelector(".form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

// DATABASE API

function fetchRequest(file, formDate){
    infoText.innerText = "Scaneie o QR Code..."
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formDate
    }).then(res => res.json()).then(result => {
        result =result[0].symbol[0].data;
        infoText.innerText = result ? "Enviar o QR Code Para Ler" : "Não foi Possivel ler o QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Não foi Possivel ler o QR Code..."
    })
}

// Enviar QR CODE PARA A API
fileInp.addEventListener("mudar", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formDate = new formDate();
    formDate.append('file', file);
    fetchRequest(file, formDate);
});

//Copiar o text
copyBtn.addEventListener("click", () =>{
    let text = document.querySelector("textarea").
    textContent;
    navigator.clipboard.writeText(text)
})

// Quando o usario clicar no formulario do fileInp função do EventListener
form.addEventListener("click", () => fileInp.click());

closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));