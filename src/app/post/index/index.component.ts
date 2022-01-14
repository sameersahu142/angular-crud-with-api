import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { User } from '../post';
      
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
      
  posts: User[] = [];
    
  constructor(public postService: PostService) { }
  
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: User[])=>{
      this.posts = data;
      console.log(this.posts);
    })  
  }
    
  deletePost(id:number){
    this.postService.deleteData(id).subscribe(res => {
        this.posts = this.posts.filter(item => item.id !== id);
        console.log('Post deleted successfully!');
    })
  }
    
}