const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(leasons=>readData(leasons.data));
}
const levelData=(id)=>{
    let url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res=>res.json()).then(data=>displayLevelData(data.data));
}
const displayLevelData=(data)=>{
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML="";
    data.forEach(word=>{
        const card=document.createElement('div');
        // "id": 43,
        // "level": 5,
        // "word": "Radiant",
        // "meaning": "উজ্জ্বল / দীপ্তিময়",
        // "pronunciation": "রেডিয়ান্ট"
        card.innerHTML=`
         <div class="bg-white shadow-sm py-10 px-5 rounded-xl text-center space-y-2 ">
            <h2 class="font-bold text-3xl">${word.word}</h2>
            <p class="font-medium text-xl">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[rgb(26_145_255/0.1)] hover:bg-[rgb(26_145_255/80)]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[rgb(26_145_255/0.1)] hover:bg-[rgb(26_145_255/80)]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
      </div>
        `;
        wordContainer.appendChild(card);
    });
}
const readData=(leason)=>{
    const btnParent=document.getElementById('btn-container');
    btnParent.innerHTML="";
    leason.forEach(element=> {
       let btnLesson=document.createElement('button');
       btnLesson.innerHTML=`
                <button onclick="levelData(${element.level_no})" class="btn btn-outline btn-primary text-xs"><i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}</button>
       `;
       btnParent.appendChild(btnLesson);
    });
}
loadData();