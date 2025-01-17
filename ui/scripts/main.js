$(function () {
	let buckleSound = false;
	window.addEventListener("message", function (event) {
		if (event.data.action == "VehicleInfo") {
			let VehicleSpeed = event.data.vehicleSpeed;
			let VehicleHealth = event.data.vehicleHealth;
			let VehicleRPM = event.data.rpm;
			let Fuel = event.data.fuel;

			$(".speed").text(String(VehicleSpeed).padStart(3, "0"));
			$(".rpm-bar").css("width", VehicleRPM + "%");
			$(".fuel-bar").css("height", Fuel + "%");

			if (Fuel <= 40 && Fuel >= 20) {
				$(".fuel").attr("src", "img/fuel40.png");
				$(".fuel-bar").css("background-color", "#FFA229");
			} else if (Fuel <= 20) {
				$(".fuel").attr("src", "img/fuel20.png");
				$(".fuel-bar").css("background-color", "#FF2929");
			} else {
				$(".fuel").attr("src", "img/fuel.png");
				$(".fuel-bar").css("background-color", "#FFFFFF");
			}

			if (VehicleHealth <= 700 && VehicleHealth >= 500) {
				$(".engine").attr("src", "img/engine700.png");
				$(".engine").css("opacity", "0.8");
			} else if (VehicleHealth <= 500) {
				$(".engine").attr("src", "img/engine500.png");
				$(".engine").css("opacity", "0.8");
			} else {
				$(".engine").attr("src", "img/engine.png");
				$(".engine").css("opacity", "0.3");
			}
		}

		if (event.data.action == "StreetUpdate") {
			let Street = event.data.street;
			$(".location span").text(Street);
		}

		if (event.data.action == "cruise") {
			let Cruise = event.data.cruise;

			if (Cruise) {
				$(".cruise").css("opacity", "0.8");
			} else {
				$(".cruise").css("opacity", "0.3");
			}
		}

		if (event.data.action == "belt") {
			let SeatBelt = event.data.status;
			
			if (SeatBelt) {
				$(".belt").css("opacity", "0.8");
				if (!buckleSound) {
					buckleSound = true;
					playBuckleSound();
				}
			} else {
				$(".belt").css("opacity", "0.3");
				if (buckleSound) {
					buckleSound = false;
					playUnbuckleSound();
				}
			}
		}

		if (event.data.action == "talkingState") {
			if (event.data.state){
				$(".voicehud").css("opacity", "1.0");
			}else{
				$(".voicehud").css("opacity", "0.3");
			}
		}

		if (event.data.action == "voiceMod") {
			if (event.data.value == 1) {
				$(".voicehud .voice .one").css("background-color", "#fff");
				$(".voicehud .voice .two").css("background", "none");
				$(".voicehud .voice .sec").css("background", "none");
			} else if (event.data.value == 2) {
				$(".voicehud .voice .one").css("background-color", "#fff");
				$(".voicehud .voice .two").css("background-color", "#fff");
				$(".voicehud .voice .sec").css("background", "none");
			} else if (event.data.value == 3) {
				$(".voicehud .voice .one").css("background-color", "#fff");
				$(".voicehud .voice .two").css("background-color", "#fff");
				$(".voicehud .voice .sec").css("background-color", "#fff");
			}
		}

		if (event.data.action == "useOrNot") {
			let data = event.data
			if (data.voiceHud){
				$(".voicehud").show()
			}else{
				$(".voicehud").hide()
			}
			if (data.playerStats){
				$(".stats").show();
			}else{
				$(".stats").hide();
			}
			if (data.statusHud){
				$(".status").show();
			}else{
				$(".status").hide();
			}
			if (data.carHud){
				$(".carhud").show();
			}else{
				$(".carhud").hide();
			}
			if (data.speedUnit == "kmh") {
				$(".speed-unit").text("KMH");
			} else {
				$(".speed-unit").text("MPH");
			}
		}

		if (event.data.action == "NotUseCarHud") {
			$(".map-outline").fadeIn();
			$(".status-wrapper").css("left", "15vw");
			$(".stamina-wrapper").fadeOut();
			$(".location").css({
				bottom: "19vh",
				left: "0",
			});
		}

		if (event.data.action == "HungerUpdate") {
			let Hunger = event.data.hunger;
			$(".hunger").css(
				"background-image",
				`conic-gradient(#fff ` + Hunger + `%, transparent ` + (Hunger - 100) + `%, transparent)`
			);
		}

		if (event.data.action == "ThirstUpdate") {
			let Thirst = event.data.thirst;
			$(".thirst").css(
				"background-image",
				`conic-gradient(#fff ` + Thirst + `%, transparent ` + (Thirst - 100) + `%, transparent)`
			);
		}

		if (event.data.action == "StatsUpdate") {
			$(".stats").css("display", "flex");

			$(".id span").text(event.data.playerId);
			$(".ping span").text(event.data.playerPing + "ms");
			$(".bank span").text("$" + event.data.playerCash);
			$(".cash span").text("$" + event.data.playerBank);
		}

		if (event.data.action == "StatusUpdate") {
			if (event.data.inCar){
				$(".carhud").fadeIn();
				$(".carhud").css("display", "flex");
				$(".carhud").css("right", "35px");
				$(".map-outline").fadeIn();
				$(".status-wrapper").css("left", "15vw");
				$(".stamina-wrapper").fadeOut();
				$(".location").css({
					bottom: "19vh",
					left: "0",
				});
			}else{
				$(".carhud").fadeOut();
				$(".carhud").css("right", "-335px");
				$(".rpm-bar").css("width", "0%");
				$(".map-outline").fadeOut();
				$(".status-wrapper").css("left", "0px");
				$(".stamina-wrapper").fadeIn();
				$(".location").css({
					bottom: "1vh",
					left: "50px",
				});
			}

			let Health = event.data.health;
			let Armour = event.data.armour;
			let Stamina = event.data.stamina;
			let Oxygen = event.data.oxygen;
			let isStandalone = event.data.isStandalone;
			let InWater = event.data.inWater;

			if (Armour == 0) {
				$(".armour-wrapper").fadeOut();
			} else if (Armour > 0) {
				$(".armour-wrapper").fadeIn();
			}

			if (InWater) {
				$(".oxygen-wrapper").fadeIn();
			} else{
				$(".oxygen-wrapper").fadeOut();
			}

			if (isStandalone == "standalone") {
				$(".hunger-wrapper").hide();
				$(".thirst-wrapper").hide();
				$(".stats .bottom").hide();
			}

			$(".health").css(
				"background-image",
				`conic-gradient(#fff ` + Health + `%, transparent ` + (Health - 100) + `%, transparent)`
			);
			$(".armour").css(
				"background-image",
				`conic-gradient(#fff ` + Armour + `%, transparent ` + (Armour - 100) + `%, transparent)`
			);
			$(".stamina").css(
				"background-image",
				`conic-gradient(#fff ` + Stamina + `%, transparent ` + (Stamina - 100) + `%, transparent)`
			);
			$(".oxygen").css(
				"background-image",
				`conic-gradient(#fff ` + Oxygen + `%, transparent ` + (Oxygen - 100) + `%, transparent)`
			);
		}

		if (event.data.action == "loggedIn") {
			if(event.data.status){
				$("body").fadeIn()
			}else{
				$("body").fadeOut()
			}
		}
	});
});

let buckleSound = new Audio();
buckleSound.src = "sounds/buckle.mp3";
let unbuckleSound = new Audio();
unbuckleSound.src = "sounds/unbuckle.mp3";

function playBuckleSound() {
	buckleSound.play();
}

function playUnbuckleSound() {
	unbuckleSound.play();
}
