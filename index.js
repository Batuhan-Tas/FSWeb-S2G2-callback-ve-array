const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const data2014 = fifaData.filter((fifa2014) => {
	return fifa2014.Year == '2014';
	
})

const fifafinal = data2014.filter((finaldata) => {
	return finaldata.Stage == 'Final'
})

console.log(fifafinal);

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
console.log(fifafinal[0]['Home Team Name']);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(fifafinal[0]['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(fifafinal[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(fifafinal[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
function winner2014() {
	if(fifafinal[0]['Home Team Goals'] > fifafinal[0]['Away Team Goals']){
		return fifafinal[0]['Home Team Name'];
	}
	else{
		return fifafinal[0]['Away Team Name'];
	}
		
}

console.log(winner2014());

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/


function Finaller(fifaData) {
	let finaller = fifaData.filter((finalSec) => {
		return finalSec.Stage =='Final';
	})
    
	return finaller;

}



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData,callback) {
	let finaller = callback(fifaData);
	const year = finaller.map(yilsec => {
		return yilsec.Year;

	})
	
	return year;
}

console.log(Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(fifaDatas,callback) {
	const kazananlar = [];
	let kazanan = callback(fifaDatas);

	for(let i=0; i<kazanan.length;i++){
		if(kazanan[i]['Home Team Goals']>kazanan[i]['Away Team Goals']){
			kazananlar.push(kazanan[i]['Home Team Name']);
		}
		else if (kazanan[i]['Home Team Goals']<kazanan[i]['Away Team Goals']){
			kazananlar.push(kazanan[i]['Away Team Name']);
		}
	}
	
   return kazananlar;
	
}



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData2,finallerfonk2,yıllarfonk,kazananlarfonk) {
	
const finaller = finallerfonk2(fifaData2);
const yıllar2 = yıllarfonk(finaller,finallerfonk2);
const kazananlar = kazananlarfonk(finaller,finallerfonk2);
	
	let sonuclar = yıllar2.map((year,index) => {
	return year + ' yılında, ' +kazananlar[index] + ' dünya kupasını kazandı!'; 



	})
return sonuclar;
}


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finallerfonk3) {
	
	     
	
}



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
