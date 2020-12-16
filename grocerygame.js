function addEvent (obj, type, fn)
{
	if(obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}
	else if(obj.attachEvent){
		obj.attachEvent("on"+type, fn);
	}
}

function init(){
	guesses=0;
	quantity=0;
	groceryItems=[{name:"cereal", description:"525 gram box of Shredded Wheat cereal, high in fiber and sugar free", price:Number((Math.random()*2 + 2).toFixed(2))}, 
	{name:"corn syrup", description:"1 liter bottle of No Name corn syrup", price:Number((Math.random()*2 + 4).toFixed(2))}, 
	{name:"cheese strings", description:"168 gram pack of Black Diamond cheese strings", price:Number((Math.random()*2 + 3).toFixed(2))}, 
	{name:"water bottle", description:"1.5 liter bottle of President&#39;s Choice natural spring water", price:Number((Math.random() + 0.7).toFixed(2))}, 
	{name:"orange juice", description:"1.75 liter bottle of President&#39;s Choice orange juice with pulp", price:Number((Math.random()*2 + 1.6).toFixed(2))},
	{name:"peanut butter", description:"500 gram jar of smooth peanut butter from Jif", price:Number((Math.random() + 2.5).toFixed(2))},
	{name:"soup", description:"540 milliliter can of Campbell&#39;s Italian Wedding soup", price:Number((Math.random() + 1).toFixed(2))},
	{name:"ginger ale", description:"500 milliliter bottle of Canada Dry ginger ale", price:Number((Math.random()*2 + 1.3).toFixed(2))},
	{name:"green peas", description:"284 milliliter can of Green Giant green peas", price:Number((Math.random() + 0.8).toFixed(2))},
	{name:"mayonnaise", description:"750 milliliter bottle of Hellmann&#39;s mayonnaise", price:Number((Math.random()*2 + 3).toFixed(2))},
	{name:"granola bars", description:"210 gram box of Nature Valley granola bars", price:Number((Math.random() + 3.2).toFixed(2))},
	{name:"worcestershire sauce", description:"295 milliliter bottle of French&#39;s Worcestershire sauce", price:Number((Math.random() + 3.2).toFixed(2))},
	{name:"noodle mix", description:"200 gram box of Betty Crocker Hamburger Helper noodle mix", price:Number((Math.random() + 2.1).toFixed(2))},
	{name:"vinegar", description:"500 milliliter bottle of President&#39;s Choice vinegar", price:Number((Math.random()*2 + 3).toFixed(2))},
	{name:"kettle chips", description:"45 gram bag of Kettle brand potato chips", price:Number((Math.random() + 0.5).toFixed(2))},
	{name:"couscous", description:"907 gram bag of Clic brand couscous", price:Number((Math.random() + 3.6).toFixed(2))},
	{name:"milkshake drink", description:"473 milliliter bottle of Coffee Crisp chocolate flavored milkshake drink", price:Number((Math.random() + 1).toFixed(2))},
	{name:"brownie mix", description:"450 gram box of Duncan Hines brownie mix", price:Number((Math.random() + 2.2).toFixed(2))},
	{name:"iced tea", description:"2 liter bottle of Lipton Brisk iced tea", price:Number((Math.random() + 1).toFixed(2))},
	{name:"waffles", description:"280 gram box of 8 Eggo waffles", price:Number((Math.random()*1.4 + 2).toFixed(2))},
	{name:"mushrooms", description:"227 gram box of President&#39;s Choice white mushrooms", price:Number((Math.random() + 1.6).toFixed(2))}];
	itemsInGame=new Array();
	total=0;
	won=false;
	picker=0;
	itemPrice=0;
	//inputItem="";
	
	/*ENABLE START AT THE BEGINNING*/
	document.getElementById("startGame").disabled = false;
	document.getElementById("resetGame").disabled = true;
	document.getElementById("submitBtn").disabled = true;
	document.getElementById("inputItem").disabled = true;
	document.getElementById("inputQty").disabled = true;
	
	addEvent(document.getElementById("submitBtn"), "click", submitGuess);
	addEvent(document.getElementById("startGame"), "click", startGame);
	addEvent(document.getElementById("resetGame"), "click", resetGame);
}

function startGame(e){
	var evt = e || window.event;
	var t = evt.target || evt.srcElement;
	
	for(var i=0;i<5;i++){
		//Add an item, then remove it from the original list
		picker = Math.floor(Math.random() * groceryItems.length);
		itemsInGame[i] = groceryItems[picker];
		groceryItems.splice(picker, 1);
	}
	
	/*ENABLE START AT THE BEGINNING*/
	document.getElementById("startGame").disabled = true;
	document.getElementById("resetGame").disabled = false;
	document.getElementById("submitBtn").disabled = false;
	document.getElementById("inputItem").disabled = false;
	document.getElementById("inputQty").disabled = false;
	
	/*INITIALIZATION*/
	totalStr = "0"+total.toFixed(2);
	
	document.getElementById("num1text").innerHTML = totalStr.substring(0,1);
	document.getElementById("num2text").innerHTML = totalStr.substring(1,2);
	document.getElementById("num3text").innerHTML = totalStr.substring(3,4);
	document.getElementById("num4text").innerHTML = totalStr.substring(4,5);
	
	document.getElementById("items-in-play").innerHTML = "<p>Here are the items that can be purchased in this game. When selecting items, please write the item name exactly as shown prior to the dash (-). Case is insenstive. The minimum amount of times that one item can be purchased is 1 and the maximum amount of times that one item can be purchased is 9. Anything outside of 1 to 9 will default to either the minimum or maximum value. Default value is 1.<br/>";
	for(var i=0;i<5;i++){
		document.getElementById("items-in-play").innerHTML += itemsInGame[i].name + " - " + itemsInGame[i].description + "<br/>";
		itemsInGame[i].price = Number((itemsInGame[i].price).toFixed(2));
	}
	document.getElementById("items-in-play").innerHTML += "</p>";
	
	document.getElementById("guesses-left").innerHTML = "Guesses Remaining: " + (5-guesses);
}

function submitGuess(e){
	var evt = e || window.event;
	var t = evt.target || evt.srcElement;
	
	var itemToRemoveFromList;
	
	try{
		if(document.getElementById("inputItem").value.valueOf() == ""){
			throw new Error();
		}
		else {
			inputItem = document.getElementById("inputItem").value.toLowerCase();
		}
	}
	catch (error){
		document.getElementById("gameplay").innerHTML = "<p>EXCEPTION THROWN: Error, you inputted invalid data. Game over.</p>";
		document.getElementById("startGame").disabled = true;
		document.getElementById("resetGame").disabled = true;
		document.getElementById("submitBtn").disabled = true;
		document.getElementById("inputItem").disabled = true;
		document.getElementById("inputQty").disabled = true;
	}
	
	found=false;
	
	/*POPULAR REPLACEMENTS*/
	inputItem = inputItem.replace("canada dry", "ginger ale");
	inputItem = inputItem.replace("hamburger helper", "noodle mix");
	inputItem = inputItem.replace("eggos", "waffles");
	
	/*THE MINIMUM IS 1 AND THE MAXIMUM IS 9. IF A USER INPUTS A NUMBER LESS THAN 1 OR HIGHER THAN 9, IT WILL DEFAULT TO THE MIN OR MAX VALUE*/
	quantity = document.getElementById("inputQty").value;
	quantity = Math.min(9, Math.max(1, quantity));
	document.getElementById("inputQty").value = quantity;
	
	try {
		if(guesses < 5 && total < 20){
			for(var j=0;j<itemsInGame.length;j++){
				if(itemsInGame[j].name.valueOf() == inputItem){
					found = true;
					itemPrice = Number((itemsInGame[j].price).toFixed(2));
					itemToRemoveFromList = j;
					break;
				}
			}
			
			if(!found){
				throw new Error();
			}
			
			itemsInGame.splice(itemToRemoveFromList, 1);
			total = total + (itemPrice * quantity);
					
			/*FORMATTING*/
			if(total < 10) {
				totalStr = "0"+total.toFixed(2);
				document.getElementById("gameplay").innerHTML += "<p>You purchased "+quantity+" "+inputItem+", a total of $"+(itemPrice * quantity).toFixed(2)+". Your total is $"+(total).toFixed(2)+".</p>";
			}
			else {
				totalStr = total.toFixed(2);
				document.getElementById("gameplay").innerHTML += "<p>You purchased "+quantity+" "+inputItem+", a total of $"+(itemPrice * quantity).toFixed(2)+". Your total is $"+(total).toFixed(2)+".</p>";
			}
			
			/*FORMATTING*/
			document.getElementById("num1text").innerHTML = totalStr.substring(0,1);
			document.getElementById("num2text").innerHTML = totalStr.substring(1,2);
			document.getElementById("num3text").innerHTML = totalStr.substring(3,4);
			document.getElementById("num4text").innerHTML = totalStr.substring(4,5);
			
			guesses++;
		}
		/*IF GUESSES REMAIN*/
		if(guesses < 5){
			if(total < 20){
				document.getElementById("guesses-left").innerHTML = "Guesses Remaining: " + (5-guesses);
			}
			else {
				//DO STUFF
				if(total >= 20 && total <= 22){
					/*WIN*/
					won = true;
					document.getElementById("game-strip").style.backgroundColor = "green";
					document.getElementById("startGame").disabled = true;
					document.getElementById("resetGame").disabled = false;
					document.getElementById("submitBtn").disabled = true;
					document.getElementById("inputItem").disabled = true;
					document.getElementById("inputQty").disabled = true;
					document.getElementById("gameplay").innerHTML += "<p>Your total is $"+(total).toFixed(2)+". Congratulations, you win!</p>";
				}
				else if(total > 22){
					/*LOSS*/
					won = false;
					document.getElementById("game-strip").style.backgroundColor = "red";
					document.getElementById("startGame").disabled = true;
					document.getElementById("resetGame").disabled = false;
					document.getElementById("submitBtn").disabled = true;
					document.getElementById("inputItem").disabled = true;
					document.getElementById("inputQty").disabled = true;
					document.getElementById("gameplay").innerHTML += "<p>Your total is $"+(total).toFixed(2)+". Sorry, you lose!</p>";
				}
			}
		}
		/*IF ALL GUESSES USED*/
		else {
			if(total < 20){
				/*LOSS*/
				won = false;
				document.getElementById("game-strip").style.backgroundColor = "red";
				document.getElementById("startGame").disabled = true;
				document.getElementById("resetGame").disabled = false;
				document.getElementById("submitBtn").disabled = true;
				document.getElementById("inputItem").disabled = true;
				document.getElementById("inputQty").disabled = true;
				document.getElementById("gameplay").innerHTML += "<p>Your total is $"+(total).toFixed(2)+". Sorry, you lose!</p>";
			}
			else if(total >= 20 && total <= 22){
				/*WIN*/
				won = true;
				document.getElementById("game-strip").style.backgroundColor = "green";
				document.getElementById("startGame").disabled = true;
				document.getElementById("resetGame").disabled = false;
				document.getElementById("submitBtn").disabled = true;
				document.getElementById("inputItem").disabled = true;
				document.getElementById("inputQty").disabled = true;
				document.getElementById("gameplay").innerHTML += "<p>Your total is $"+(total).toFixed(2)+". Congratulations, you win!</p>";
			}
			else {
				/*LOSS*/
				won = false;
				document.getElementById("game-strip").style.backgroundColor = "red";
				document.getElementById("startGame").disabled = true;
				document.getElementById("resetGame").disabled = false;
				document.getElementById("submitBtn").disabled = true;
				document.getElementById("inputItem").disabled = true;
				document.getElementById("inputQty").disabled = true;
				document.getElementById("gameplay").innerHTML += "<p>Your total is $"+(total).toFixed(2)+". Sorry, you lose!</p>";
			}
		}
	}
	catch (error) {
		document.getElementById("gameplay").innerHTML = "<p>EXCEPTION THROWN: Error, you inputted invalid data. Game over.</p>";
		document.getElementById("startGame").disabled = true;
		document.getElementById("resetGame").disabled = true;
		document.getElementById("submitBtn").disabled = true;
		document.getElementById("inputItem").disabled = true;
		document.getElementById("inputQty").disabled = true;
	}
}

function resetGame(e){
	var evt = e || window.event;
	var t = evt.target || evt.srcElement;
	
	/*REINITIALIZATION*/
	document.getElementById("items-in-play").innerHTML = "";
	document.getElementById("game-strip").style.backgroundColor = "blue";
	guesses=0;
	quantity=0;
	groceryItems=[{name:"cereal", description:"525 gram box of Shredded Wheat cereal, high in fiber and sugar free", price:Number((Math.random()*2 + 2).toFixed(2))}, 
	{name:"corn syrup", description:"1 liter bottle of No Name corn syrup", price:Number((Math.random()*2 + 4).toFixed(2))}, 
	{name:"cheese strings", description:"168 gram pack of Black Diamond cheese strings", price:Number((Math.random()*2 + 3).toFixed(2))}, 
	{name:"water bottle", description:"1.5 liter bottle of President&#39;s Choice natural spring water", price:Number((Math.random() + 0.7).toFixed(2))}, 
	{name:"orange juice", description:"1.75 liter bottle of President&#39;s Choice orange juice with pulp", price:Number((Math.random()*2 + 1.6).toFixed(2))},
	{name:"peanut butter", description:"500 gram jar of smooth peanut butter from Jif", price:Number((Math.random() + 2.5).toFixed(2))},
	{name:"soup", description:"540 milliliter can of Campbell&#39;s Italian Wedding soup", price:Number((Math.random() + 1).toFixed(2))},
	{name:"ginger ale", description:"500 milliliter bottle of Canada Dry ginger ale", price:Number((Math.random()*2 + 1.3).toFixed(2))},
	{name:"green peas", description:"284 milliliter can of Green Giant green peas", price:Number((Math.random() + 0.8).toFixed(2))},
	{name:"mayonnaise", description:"750 milliliter bottle of Hellmann&#39;s mayonnaise", price:Number((Math.random()*2 + 3).toFixed(2))},
	{name:"granola bars", description:"210 gram box of Nature Valley granola bars", price:Number((Math.random() + 3.2).toFixed(2))},
	{name:"worcestershire sauce", description:"295 milliliter bottle of French&#39;s Worcestershire sauce", price:Number((Math.random() + 3.2).toFixed(2))},
	{name:"noodle mix", description:"200 gram box of Betty Crocker Hamburger Helper noodle mix", price:Number((Math.random() + 2.1).toFixed(2))},
	{name:"vinegar", description:"500 milliliter bottle of President&#39;s Choice vinegar", price:Number((Math.random()*2 + 3).toFixed(2))},
	{name:"kettle chips", description:"45 gram bag of Kettle brand potato chips", price:Number((Math.random() + 0.5).toFixed(2))},
	{name:"couscous", description:"907 gram bag of Clic brand couscous", price:Number((Math.random() + 3.6).toFixed(2))},
	{name:"milkshake drink", description:"473 milliliter bottle of Coffee Crisp chocolate flavored milkshake drink", price:Number((Math.random() + 1).toFixed(2))},
	{name:"brownie mix", description:"450 gram box of Duncan Hines brownie mix", price:Number((Math.random() + 2.2).toFixed(2))},
	{name:"iced tea", description:"2 liter bottle of Lipton Brisk iced tea", price:Number((Math.random() + 1).toFixed(2))},
	{name:"waffles", description:"280 gram box of 8 Eggo waffles", price:Number((Math.random()*1.4 + 2).toFixed(2))},
	{name:"mushrooms", description:"227 gram box of President&#39;s Choice white mushrooms", price:Number((Math.random() + 1.6).toFixed(2))}];
	itemsInGame=new Array();
	total=0;
	won=false;
	picker=0;
	itemPrice=0;
	
	/*ENABLE START AT THE BEGINNING*/
	document.getElementById("startGame").disabled = false;
	document.getElementById("resetGame").disabled = true;
	document.getElementById("submitBtn").disabled = true;
	document.getElementById("inputItem").disabled = true;
	document.getElementById("inputQty").disabled = true;
	
	document.getElementById("inputItem").value = "";
	document.getElementById("inputQty").value = "";
	
	/*INITIALIZATION*/
	totalStr = "0"+total.toFixed(2);
	
	document.getElementById("num1text").innerHTML = totalStr.substring(0,1);
	document.getElementById("num2text").innerHTML = totalStr.substring(1,2);
	document.getElementById("num3text").innerHTML = totalStr.substring(3,4);
	document.getElementById("num4text").innerHTML = totalStr.substring(4,5);
	
	document.getElementById("guesses-left").innerHTML = "Guesses Remaining: " + (5-guesses);
	
	document.getElementById("gameplay").innerHTML = "";
}

var guesses, quantity, groceryItems, itemsInGame, total, won, picker, itemPrice;
var totalStr;
var inputItem;
var found; //FINDER
window.onload = init;