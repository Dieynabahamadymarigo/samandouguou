import { Component } from '@angular/core';
import { Article } from 'src/app/models/login';
import { BlogRecettesService } from 'src/app/services/blog/blog-recettes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recettesdashboard',
  templateUrl: './recettesdashboard.component.html',
  styleUrls: ['./recettesdashboard.component.css']
})
export class RecettesdashboardComponent {

  article  : Article = new Article();

  plat: string = "";
  nom:string="";
  titre:string="";
  description	:string="";
  image: any;
  datePost:string="";
  categorie_blog_id:any =[];
  // created_at= new Date;


  ngOnInit(): void {
    this.listerDesBlog();
    this.listerDesBlogArticle();
  }

  constructor(private blogService : BlogRecettesService ){}

  // inserer l'image
  getFile(event: any) {
    console.log('img', this.image);
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
  //methode pour ajouter des blog
  ajout(): void {
    {
      let formData = new FormData();
      formData.append('nomCategorie', this.plat);
      // console.log('plat', formData);

      this.blogService.createBlog(formData).subscribe(
        (rep) => {
          console.log('blog',formData )
          console.log('nomCategorie', rep.plat);
          this.listerDesBlog();
        },
        (error) => {
          console.error('erreur', error);
        }
      );
    }
    this.verifierChamps('Félicitation!', 'Categorie de article ajouté', 'success');

    // this.ajout();
    // this.ngOnInit();
    this.viderChamps();
  }

    //methode pour ajouter des article de blog
    ajoutArticle(): void {
      {
        let formData = new FormData();
        formData.append('nomPost', this.nom);
        formData.append('titrePost', this.titre);
        formData.append('description', this.description);
        formData.append('image', this.image);
        // formData.append('datePost', this.created_at.toISOString());
        formData.append('datePost', this.datePost);
        formData.append('categorie_blog_id', this.categorie_blog_id);
        // console.log('plat', formData);

        this.blogService.createArticle(formData).subscribe(
          (rep) => {
            console.log('blog',formData )
            // console.log('nomCategorie', rep.plat);
            console.log('image', rep.formData.image);
            this.listerDesBlogArticle();
          },
          (error) => {
            console.error('erreur', error);
          }
        );
      }
      this.verifierChamps('Félicitation!', 'Categorie de article ajouté', 'success');

      // this.ajout();
      // this.ngOnInit();
      this.viderChamps();
    }

  // lister blog
  tabListBlog: any = [];
  listerDesBlog() {

    console.log('agezefyvdbfegvu',this.tabListBlog);
    this.blogService.listerBlog().subscribe((data) => {
      this.tabListBlog = data.ListecategorieBlog;
      console.log('tabLivreurDipo', data.ListecategorieBlog);
    });
  }
  //  pour recuperer un blog
  blogSelectionner: any = {};

  getblog(blog: any) {
    this.blogSelectionner = blog;
  }

  // lister blog article
  tabListBlogArticle: any = [];
  listerDesBlogArticle() {

    console.log('agezefyvdbfegvu',this.tabListBlogArticle);
    this.blogService.listerAticle().subscribe((data) => {
      this.tabListBlogArticle = data.listespublications;
      console.log('tabListArticle', data.listespublications);
    });
  }
    //  pour recuperer un article de blog
    articleSelectionner: any = {};

    getArticle(article: any) {
      this.articleSelectionner = article;
    }
    // Fonction qui permet de faire des pointier si le texte est lon
    tronquerTexte(texte: string, longueurMax: number): string {
      if (texte.length > longueurMax) {
        return texte.substring(0, longueurMax) + '...';
      }
      return texte;
    }

  modifierProduit() {
    let formData = new FormData();
    formData.append('nomPost', this.nom);
    formData.append('titrePost', this.titre);
    formData.append('description', this.description);
    formData.append('image', this.image);
    formData.append('datePost', this.datePost);
    formData.append('categorie_blog_id', this.categorie_blog_id);
    this.blogService.updateArticle(this.id, formData).subscribe((response) => {
        console.log('modifProduit', response);
        this.listerDesBlogArticle();

      });
  }

  // declare id
  id: number = 0;
  chargerInfosProduit(artcle: any) {
    console.log(artcle);
    this.id = artcle.id;
    console.warn('lid de marigo', this.id);
    this.nom = artcle.nomPost;
    this.titre = artcle.titrePost;
    this.description = artcle.description;
    this.image = artcle.image;
    this.datePost = artcle.datePost;
    this.categorie_blog_id = artcle.categorie_blog_id;
    console.log('changer', this.chargerInfosProduit);
    this.listerDesBlogArticle();

  }

  // methode pour supprimer blog
  supprimerBlog(id:number){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer cet blog",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe((response) => {
          console.log('supProduit', response);
          this.listerDesBlog();

        });
      }
    });
}
  // methode pour supprimer blog article
  supprimerBlogArticle(id:number){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer cet article",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteArticle(id).subscribe((response) => {
          console.log('id',response.id)
          console.log('supProduit', response);
          this.listerDesBlogArticle();


        });
      }
    });
}
  viderChamps() {
    this.plat = '';
    this.image = '';
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  // Ferme le pop-up après 2 secondes
  setTimeout(() => {
    Swal.close();
  }, 2000);
  }
}
