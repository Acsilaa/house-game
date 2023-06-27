$(document).ready(function () {
    outcomes = [
        {
            title: `<h1>...Sikerült?</h1>`,
            text: `<p>Ahogy áttörted a barikád utolsó deszkáját, egy fekete kutya ugrott neked a sötétből. A fejszével sikerült leütnöd, de most valahogy... Máshová kerültél. Mintha csak egy álom lett volna...</p>`
        },
        {
            title: `<h1>Sikerült.</h1>`,
            text: `<p>Ahogy áttörted a barikád utolsó deszkáját, egy fekete kutya ugrott neked a sötétből. A fejszéért nyúlsz, amit kiejettél a kezedből, de hiába. A fenevad gyorsabb nálad, és elharapja a nyakad.</p>` +
            `<p>Végre vége a szenvedéseidenk. A testedet tudod, hogy soha nem találják majd meg, de nem zavar. Mostmár megnyugodhatsz.</p>`
        }
    ]
    ending = outcomes[Math.floor(Math.random() * 2)];
    $("body").append(ending.title);
    $("body").append(ending.text);
    $("body").append(`<button class="restart">Újra</button>`);
    $(".restart").click(function () { 
        window.location.href = "./index.html";
        
    });
});