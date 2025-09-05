const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(leasons=>readData(leasons.data));
}
const levelData=(id)=>{
    let url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res=>res.json()).then(data=>{
        const clickBtn=document.getElementById(`lession-btn-${id}`);
        // console.log(clickBtn); 
        clickBtn.classList.add('active');
        displayLevelData(data.data)});
}
const displayLevelData=(data)=>{
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML="";
    if(data.length==0){
        wordContainer.innerHTML=`
        <div class="col-span-3 mx-auto px-6 space-y-4 text-center">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <h3 class="text-sm text-gray-500 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
          <h2 class="text-4xl font-medium ">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    }
    data.forEach(word=>{
        const card=document.createElement('div');
        card.innerHTML=`
         <div class="bg-white shadow-sm py-10 px-5 rounded-xl text-center space-y-2 ">
            <h2 class="font-bold text-3xl">${word.word?word.word:"NOT FOUND"}</h2>
            <p class="font-medium text-xl">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning? word.meaning :"NOT FOUND" } / ${word.pronunciation? word.pronunciation: "Pronuntiation NOT FOUND"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="boxModal(${word.id})" class="btn bg-[rgb(26_145_255/0.1)] hover:bg-[rgb(26_145_255/80)]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[rgb(26_145_255/0.1)] hover:bg-[rgb(26_145_255/80)]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
      </div>
        `;
        wordContainer.appendChild(card);
    });
}
const boxModal=(id)=>{
    const modelBox=document.getElementById("modal-container");
    let boxInModal=document.createElement('div');
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url).then(res=>res.json()).then(combine=>{
        // console.log(combine.data.word);
        boxInModal.innerHTML=`
             <h2 class="text-2xl font-bold">${combine.data.word}(<i class="fa-solid fa-microphone-lines"></i>:${combine.data.pronunciation})</h2>
          <div>
            <h3 class="text-lg font-bold">Meaning</h3>
            <p class="py-4">${combine.data.meaning}</p>
          </div>
           <div>
            <h3 class="text-lg font-bold">Example</h3>
            <p class="py-4">${combine.data.sentence}</p>
          </div>
           <div>
            <h3 class="text-lg font-bold">সমার্থক শব্দ গুলো</h3>
            <p class="py-4">many</p>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        `;
    });
    modelBox.appendChild(boxInModal);
    my_modal.showModal();
}
const readData=(leason)=>{
    const btnParent=document.getElementById('btn-container');
    btnParent.innerHTML="";
    leason.forEach(element=> {
       let btnLesson=document.createElement('button');
       btnLesson.innerHTML=`
                <button id="lession-btn-${element.level_no}" onclick="levelData(${element.level_no})" class="btn btn-outline btn-primary text-xs"><i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}</button>
       `;
       btnParent.appendChild(btnLesson);
    });
}
loadData();