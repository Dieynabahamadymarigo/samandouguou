// Models pour les users
export class User{
  idUser : number = 0;
  nom : string = "";
  prenom : string = "";
  email : string = "";
  password : string = "";
  adresse : string = "";
  telephone : string = "";
  image : string = "";
  statut : boolean = false;
  role : string= "";
}

// Models pour les produits
export class Produits{
  idUser : number = 0;
  nomProduit : string = "";
  prix : string = "";
  quantiteTotale : string = "";
  description : string = "";
  image : string = "";
  categorieProduit : string [] = [];

}

// model pour le panier
export class Panier{
  idPanier : number = 0;
  nomProduitPanier : string = "";
  prixPanier : number = 0;
  imagePanier : string = "";
  quantititePanier : number = 0;
  totalPanier : number = 0;
}
