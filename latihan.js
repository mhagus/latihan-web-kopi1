let jmlWarung = 0;
let total = 0;

function hasilRating(nama, rating){
  let keterangan = "";

  if (rating >= 4.5){
    keterangan = "sangat disarankan";
  } else if(rating >= 3){
     keterangan = "rekomendasi biasa";
  } else{
    keterangan = "tidak disarankan";
  }

  jmlWarung ++;
  total += rating;
  console.log(nama+ "("+ rating +") "+":" + keterangan);

}

hasilRating("Warung Suga : ",3)
hasilRating("Warung B : ",4.75)
hasilRating("Warung C : ",2)
hasilRating("Warung D : ",4.2)
hasilRating("Warung E : ",3.4)

console.log("Rata-rata rating : " + total/jmlWarung);