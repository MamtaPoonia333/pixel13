let filters = {
    brightness:{
        value:100,
        min:0,  
        max:200,
        unit:'%'

    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    saturate:{
        value:100,
        min:0,
        max:300,
        unit:'%'
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:'deg'
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:'px'
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:'%'
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
};

const canvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = canvas.getContext("2d");
const downloadBtn = document.querySelector("#dawnload-btn");
const resetBtn = document.querySelector("#reset-btn");
const presetsContainer = document.querySelector(".presets");
const rotateBtn = document.querySelector(".rotate-btn");
const inner = document.querySelector('.inner');
const overlay = document.querySelector('.overlay');
let w = 0;
let rotation = 0;


let file = null;
let image = null;

let interval = setInterval(() => {
    if (w < 90) { 
        w += 1; 
        inner.style.width = w + '%';
    } else {
        clearInterval(interval); 
    }
}, 40); 

setTimeout(() => {
    inner.style.transition = 'width 0.5s ease-in-out';
    inner.style.width = '100%';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}, 4000);


const filterContainer = document.querySelector(".filters");

function craeteFilterElement(name,unit = '%',value,min,max){
    const div = document.createElement('div');
    div.classList.add('filter');
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement('p');
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);


    input.addEventListener("input", (e) => {
        filters[name].value = input.value;
        applyFilters();
    })

    return div;

}

function createFilters(){
    Object.keys(filters).forEach((key) => {
        const filterElement = craeteFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
        filterContainer.appendChild(filterElement);
    })
}

createFilters();


imgInput.addEventListener("change", (e) => {


    const file = e.target.files[0];

    canvas.style.display = "block";

    const imagePlaceHolder = document.querySelector(".placeholder");
    imagePlaceHolder.style.display = "none";


    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {

        image = img;
        canvas.width = img.width;
        canvas.height = img.height;
        canvasCtx.drawImage(img,0,0);
    }

})

function applyFilters(){
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    canvasCtx.save();
    canvasCtx.translate(canvas.width/2 ,canvas.height/2);
    canvasCtx.rotate(rotation);
    canvasCtx.translate(-canvas.width/2,-canvas.height/2);
    canvasCtx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit}
    ) contrast(${filters.contrast.value}${filters.contrast.unit}) saturate(${filters.saturate.value}${filters.saturate.unit}) hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit}) blur(${filters.blur.value}${filters.blur.unit}) sepia(${filters.sepia.value}${filters.sepia.unit}) opacity(${filters.opacity.value}${filters.opacity.unit}) invert(${filters.invert.value}${filters.invert.unit})`.trim();
    canvasCtx.drawImage(image,0,0);
    canvasCtx.restore();
}
rotateBtn.addEventListener("click", () => {
    rotation += Math.PI / 2;
    applyFilters();
});


resetBtn.addEventListener("click", () => {
    console.log("chetan");
    filters = {
        brightness:{
            value:100,
            min:0,  
            max:200,
            unit:'%'
    
        },
        contrast:{
            value:100,
            min:0,
            max:200,
            unit:'%'
        },
        saturate:{
            value:100,
            min:0,
            max:300,
            unit:'%'
        },
        hueRotation:{
            value:0,
            min:0,
            max:360,
            unit:'deg'
        },
        blur:{
            value:0,
            min:0,
            max:20,
            unit:'px'
        },
        sepia:{
            value:0,
            min:0,
            max:100,
            unit:'%'
        },
        opacity:{
            value:100,
            min:0,
            max:100,
            unit:'%'
        },
        invert:{
            value:0,
            min:0,
            max:100,
            unit:'%'
        },
    };
    applyFilters()
    filterContainer.innerHTML = '';
    createFilters();
})

downloadBtn.addEventListener("click", () => {
    console.log("j");
    const link = document.createElement("a");
    link.download = "Pixel13.png";
    link.href = canvas.toDataURL();
    link.click();
})

const presets = {
    normal: { brightness: 100, contrast: 100, saturate: 100, hueRotation: 0, blur: 0, sepia: 0, opacity: 100, invert: 0 },
  
    drama: { brightness: 95, contrast: 130, saturate: 120, hueRotation: -3, blur: 0, sepia: 5, opacity: 100, invert: 0 },
  
    cinematic: { brightness: 90, contrast: 125, saturate: 110, hueRotation: -6, blur: 0, sepia: 8, opacity: 100, invert: 0 },
  
    vintage: { brightness: 110, contrast: 85, saturate: 70, hueRotation: -15, blur: 0.4, sepia: 30, opacity: 100, invert: 0 },
  
    retroPop: { brightness: 108, contrast: 120, saturate: 150, hueRotation: 15, blur: 0, sepia: 0, opacity: 100, invert: 0 },
  
    warmGlow: { brightness: 112, contrast: 105, saturate: 120, hueRotation: -8, blur: 0.2, sepia: 15, opacity: 100, invert: 0 },
  
    coldTone: { brightness: 95, contrast: 110, saturate: 90, hueRotation: 20, blur: 0, sepia: 0, opacity: 100, invert: 0 },
  
    softFade: { brightness: 108, contrast: 88, saturate: 75, hueRotation: -5, blur: 0.3, sepia: 10, opacity: 100, invert: 0 },
  
    moody: { brightness: 85, contrast: 140, saturate: 50, hueRotation: -2, blur: 0, sepia: 5, opacity: 100, invert: 0 },
  
    noirClassic: { brightness: 88, contrast: 145, saturate: 5, hueRotation: 0, blur: 0, sepia: 2, opacity: 100, invert: 0 },
  
    goldenHour: { brightness: 115, contrast: 110, saturate: 140, hueRotation: -10, blur: 0, sepia: 20, opacity: 100, invert: 0 },
  
    tealOrange: { brightness: 102, contrast: 118, saturate: 125, hueRotation: 10, blur: 0, sepia: 5, opacity: 100, invert: 0 },
  
    dreamySoft: { brightness: 120, contrast: 90, saturate: 130, hueRotation: -5, blur: 0.5, sepia: 15, opacity: 100, invert: 0 },
  
    cyberpunk: { brightness: 95, contrast: 130, saturate: 180, hueRotation: 25, blur: 0, sepia: 0, opacity: 100, invert: 0 },
  
    mutedFilm: { brightness: 92, contrast: 100, saturate: 80, hueRotation: -12, blur: 0, sepia: 25, opacity: 100, invert: 0 },
  
    pastelVibe: { brightness: 110, contrast: 95, saturate: 130, hueRotation: 5, blur: 0.2, sepia: 10, opacity: 100, invert: 0 }
};
  
  
Object.keys(presets).forEach((presetName) => {
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText = presetName;
    presetsContainer.appendChild(presetButton);
    presetButton.addEventListener("click", () => {
        const preset = presets[presetName];
        console.log(preset);
        Object.keys(preset).forEach((key) => {
            filters[key].value = preset[key];
        });

        applyFilters();
        filterContainer.innerHTML = '';
        createFilters();
    })
})


