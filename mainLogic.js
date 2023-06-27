pbr = {
    hasAxe: false,
    
    optionConditions: [
        true, // read only use! 0
        true, // take axe 1
        false, // break barricade 2
        true  // 3
    ]
}
prevRoom = "asd";
crrntRoom = "asd";
elementtag = ".jsgen";
elementtagHTML = "jsgen";

map = [];
class Option{ // majd teszteljen rá az előzőre és hagyja ki önmagát megjelenítésnél
    text = "";
    response = "";
    pbrCondIndex = 0;
    constructor(text, pbrCondIndex = 0){
        this.text = text;
        this.pbrCondIndex = pbrCondIndex;
    }
    CreateElement(i){
        
        let c = `<button class="` + elementtagHTML + ` ` + ((typeof map[i] === "function") ? `axe` : ``) + ` .button" onclick="map[` + i + `]` + ((typeof map[i] === "function") ? `()` : `.INIT()`) + `">` + this.text + `</button>`;

        $(".optionsdiv").append(c);
    }
}

class Room{
    title;
    story;
    options = [];
    constructor(title, story, options){
        this.title = title;
        this.story = story;
        this.options = options;
    }
    INIT(){
        $(elementtag).remove();
        prevRoom = crrntRoom;
        crrntRoom = this;
        console.log(this.options.length);
        console.log("INIT triggered");
        //story etc
        let cont1 = `<h1 class="roomtitle ` + elementtagHTML + `">` + this.title + `</h2>`;
        let cont2 = `<h5 class="roomstory ` + elementtagHTML + `">` + this.story + `</h5>`;
        $(".main").append(cont1);
        $(".main").append(cont2);
        document.title = this.title;

        //for options
        for (let i = 0; i < this.options.length; i++) {
            map[i] = this.options[i].response;
            if(!pbr.optionConditions[this.options[i].pbrCondIndex]) continue;
            this.options[i].CreateElement(i);
        }
    }
}


entrance = new Room(
    "Bejárat előtt",
    "...És ott állsz a ház bejárata előtt. Ha visszafordulsz, tudod, mi vár rád. Nincs más hátra, mint előre.",
    [
        new Option("*Benyitás*")
    ]
);
crrntRoom = entrance;
anteroom = new Room(
    "Előszobában",
    "...Egy nagyon erős bűzt érzel, de nem tudod, honnan ered. Látsz két ajtót. \n" + 
    "Az egyik egy folyosóra, a másik egy nappaliba vezet.",
    [
        new Option("Folyosóra"),
        new Option("Nappaliba")
    ]
);
hallway = new Room(
    "Folyosón",
    "...Nagyon sötét van, de valahogy a homályban látsz 3 ajtót.\n" + 
    "Az egyik a garázsé, a második a konyháé, a harmadik a hálószobáé.",
    [
        new Option("Garázs"),
        new Option("Konyha"),
        new Option("Háló"),
        new Option("Előszoba")
    ]
); 
livingroom = new Room(
    "Nappaliban",
    "...Ittangyon erős az bűz, amit korábban éreztél. Látsz egy mellékhelyiséget és konyhát a félig nyitott ajtókon át.",
    [
        new Option("Mosdó"),
        new Option("Konyhába"),
        new Option("Előszoba")
    ]
);
kitchen = new Room(
    "Konyhában",
    "...Vér a pultokon, egy fekete, szenes valami a sütőben, de legább nincs olyan büdös. Még egy spájz is van! Na meg egy sötét folyosó. A nappaliba is mehetsz.",
    [
        new Option("Spájz"),
        new Option("Folyosó"),
        new Option("Nappali")
    ]
);
pantry = new Room(
    "Spájz",
    "...Na innen ne egyél semmiből. NE. IS. GONDOLJ. RÁ. Mondjuk ki tudja? Lehet hogy finom az emberi hús.",
    [
        new Option("Vissza a konyhába"),
        new Option("Kóstoló")
    ]
);
wc = new Room(
    "WC-ben",
    "...Majdnem elájulsz a bűztől, miközben megnézed a... azt a maradványt a wc-n. Ki tudja hogy mi volt az a valami?",
    [
        new Option("Vissza a nappaliba")
    ]
);
garage = new Room(
    "Garázsban",
    "...Egy üres szoba egy garázsajtóval. Naggggyon otthonos. De nézd! Egy polc fejszékkel.",
    [
        new Option("Vissza a folyosóra"),
        new Option("Egy fejsze elvétele", 1)
    ]
);
bedroom = new Room(
    "Hálószobában",
    "...Egy fa ágykeret és egy rakás papagájkalitka. Hmmm... Vajon mi lehet az elbarikádozott ajtó mögött a sarokban?",
    [
        new Option("Vissza a folyosóra"),
        new Option("Barikád megtekintése")
    ]
);
barricade = new Room(
    "A bar|kád",
    "...Eh]ez kell va!ami ]rős, hogy áttörd.",
    [
        new Option("V|ssza ä há!ószo$ához"),
        new Option("Ba€i#ád á÷?!$éße a F]j$zéVel", 2)
    ]
);

entrance.options[0].response = anteroom;

anteroom.options[0].response = hallway;
anteroom.options[1].response = livingroom;

livingroom.options[0].response = wc;
livingroom.options[1].response = kitchen;
livingroom.options[2].response = anteroom;

wc.options[0].response = livingroom;

kitchen.options[0].response = pantry;
kitchen.options[1].response = hallway;
kitchen.options[2].response = livingroom;

pantry.options[0].response = kitchen;
pantry.options[1].response = function(){
    window.location.href = "./gameover.html";
}

hallway.options[0].response = garage;
hallway.options[1].response = kitchen;
hallway.options[2].response = bedroom;
hallway.options[3].response = anteroom;

garage.options[0].response = hallway;
garage.options[1].response = function(){
    pbr.optionConditions[1] = false;
    pbr.hasAxe = true;
    pbr.optionConditions[2] = true;
    $(".axe").remove();
    $("body").append(
        `<img src="./axe.png" class="axepng" />`
    );
};

bedroom.options[0].response = hallway;
bedroom.options[1].response = barricade;

barricade.options[0].response = bedroom;
barricade.options[1].response = function(){
    window.location.href = "./aftermath.html";
};

$(document).ready(function () {
    entrance.INIT();
   
});