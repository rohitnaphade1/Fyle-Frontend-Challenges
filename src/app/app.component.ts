import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);  
   }


  githubUsername: string = '';
  lineValue: number = 50; 
  showsizeselector:boolean=false
  github:string = 'https://github.com';
  userGithubLink:string ='';
  repositories: any[] = [];
  isValidUser: boolean = true;
  userProfile: any; 
  user!: any;
  modifyrepo:boolean=false
  displayedElements: any[] = [];
  elementsPerPage: number = 10;
  currentPage: number = 1;
  displayRepo:boolean=true
  displayModifiedRepo:boolean=false
  
  

getRepositories() {    

    if (this.githubUsername){
    this.apiService.getUserRepositories(this.githubUsername).subscribe(
      (user) => {
        this.userGithubLink = this.github+'/'+this.githubUsername
        this.userProfile = user;
        this.isValidUser = true;
        this.showsizeselector=true
        console.log('User Profile:', this.userProfile);   
      },
      (error: any)=>{
      console.error('Error fetching user profile:', error);
        this.userProfile = null; 
        this.isValidUser = false;
        this.userGithubLink ="";
      }
      
    
    );
  }else{
    this.userProfile = null; 
    this.isValidUser = false; 
  }


  this.apiService.getUser(this.githubUsername) 
  .subscribe((repositories) => {
  this.repositories = repositories;
  this.modifyrepo = true
  console.log('Repositories:', this.repositories);
    }, (error) => {
  console.error('Error fetching repositories:', error);
    })
  }
  //elements: number[] = Array.from({ length: 100 }, (_, index) => index + 1);
  
  updateDisplayedElements() {
    const startIndex = (this.currentPage - 1) * this.elementsPerPage;
    const endIndex = startIndex + this.elementsPerPage;
    this.displayedElements = this.repositories.slice(startIndex, endIndex);
    this.displayRepo=false
    this.displayModifiedRepo=true
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedElements();
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedElements();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.repositories.length / this.elementsPerPage);
  }

}
