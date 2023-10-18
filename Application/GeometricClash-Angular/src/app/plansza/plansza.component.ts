import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { delay, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';
import { member } from '../_models/member';
import { User } from '../_models/user';



@Component({
  selector: 'app-plansza',
  templateUrl: './plansza.component.html',
  styleUrls: ['./plansza.component.css']
})
export class PlanszaComponent implements OnInit {


  @Input()
  isWarrior = false;
  @Input()
  isMage = false;
  @Input()
  isArcher = false;

  user: User;
  member: member;
  readonly submitScorePath = this.auth.BaseURL + "/Stats";

  figureArray = new Array<Figure>();
  colors = ['circle', 'square', 'triangle'];
  collectFigures = [];
  boardSide = 6;
  boardSize = Math.pow(this.boardSide, 2);
  points = 0;
  pointsLevelOne=0;
  pointsLevelTwo=0;
  pointsLevelThree=0;
  fullPoints=0;
  steps=25;
  levelOne = true;
  levelTwo = false;
  levelThree = false;
  damageDealt: number;
  hpBossOne=100;
  hpBossTwo=200;
  hpBossThree=300;
  isGameOver=false;
  heroName: string;
  heroId: number;


  



  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService, private router: Router) {
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

    this.createSymbols();
  }


  createSymbols(): void {
    let x = 0;
    let y = 0;
    for (let index = 0; index < this.boardSize; index++) {

      let figure: Figure;
      const changeFigure = Math.random() < 0.8;

      do {
        const randomColor = Math.floor(Math.random() * this.colors.length);
        figure = new Figure(this.colors[randomColor], x, y);
      }
      while (this.figureArray[this.figureArray.length - 1]?.figure === figure.figure && changeFigure);

      if (x === this.boardSide - 1) {
        x = 0;
        y += 1;
      }
      else {
        x += 1;
      }
      this.figureArray.push(figure);
    }
  }

  swapFigures(symbol): void {
    const figure = symbol;
    let ind = this.figureArray.indexOf(symbol);
    if (this.collectFigures.length === 1) {

      if (this.collectFigures[0] === figure) {
        this.figureArray[this.figureArray.indexOf(this.collectFigures[0])].css = '';
        this.collectFigures.pop();
      }
      else if (this.collectFigures[0].figure === figure.figure) {
        this.figureArray[this.figureArray.indexOf(this.collectFigures[0])].css = '';
        this.collectFigures.pop();
      }
      else if (this.collectFigures[0].y === figure.y) {
        if (this.collectFigures[0].x - 1 === figure.x || this.collectFigures[0].x + 1 === figure.x) {
          this.collectFigures.push(figure);
        }
      }
      else if (this.collectFigures[0].y - 1 === figure.y || this.collectFigures[0].y + 1 === figure.y) {
        if (this.collectFigures[0].x === figure.x) {
          this.collectFigures.push(figure);
        }
      }
      else {
        this.figureArray[this.figureArray.indexOf(this.collectFigures[0])].css = '';
        this.collectFigures.pop();
      }
    }
    else {
      this.figureArray[ind].css = 'choice';
      this.collectFigures.push(figure);

    }

    if (this.collectFigures.length === 2) {
      const firstIn = this.figureArray.indexOf(this.collectFigures[0]);
      const secIn = this.figureArray.indexOf(this.collectFigures[1]);
      const tmpFirst = JSON.parse(JSON.stringify(this.figureArray[firstIn]));
      const tmpSec = JSON.parse(JSON.stringify(this.figureArray[secIn]));

      this.figureArray[firstIn].figure = this.figureArray[secIn].figure;
      this.figureArray[secIn].figure = tmpFirst.figure;

      if (!this.doHaveCollisions(this.figureArray[secIn])) {
        this.figureArray[firstIn].figure = tmpFirst.figure;
        this.figureArray[secIn].figure = tmpSec.figure;
      }
      this.figureArray[this.figureArray.indexOf(this.collectFigures[0])].css = '';
      this.collectFigures.pop();
      this.collectFigures.pop();
    }
  }

  doHaveCollisions(figure): boolean {
    const figureIndex = this.figureArray.indexOf(figure);
    let collisionsIndex = [];

    collisionsIndex = collisionsIndex.concat(this.checkRightX(figureIndex));
    collisionsIndex = collisionsIndex.concat(this.checkLeftX(figureIndex));
    collisionsIndex = collisionsIndex.concat(this.checkUpY(figureIndex));
    collisionsIndex = collisionsIndex.concat(this.checkDownY(figureIndex));




    collisionsIndex = collisionsIndex.filter(function (elem, index, self): boolean {
      return index === self.indexOf(elem);
    });

    collisionsIndex.sort(function (a, b) { return b - a });

    if (collisionsIndex?.length > 2) {


      if (this.isArcher === true) {
        switch (this.figureArray[collisionsIndex[0]].figure) {
          case 'triangle':
            this.damageDealt = Math.round(collisionsIndex.length * 1.6);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
          case 'circle':
            this.damageDealt = Math.round(collisionsIndex.length * 1.3);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
          case 'square':
            this.damageDealt = Math.round(collisionsIndex.length);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
        }
      }
      if (this.isMage === true) {
        switch (this.figureArray[collisionsIndex[0]].figure) {
          case 'triangle':
            this.damageDealt = Math.round(collisionsIndex.length * 1.3);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
          case 'circle':
            this.damageDealt = Math.round(collisionsIndex.length);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
          case 'square':
            this.damageDealt = Math.round(collisionsIndex.length * 1.6);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
        }
      }
      if (this.isWarrior === true) {
        switch (this.figureArray[collisionsIndex[0]].figure) {
          case 'triangle':
            this.damageDealt = Math.round(collisionsIndex.length);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
          case 'circle':
            this.damageDealt = Math.round(collisionsIndex.length * 1.6);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
          case 'square':
            this.damageDealt = Math.round(collisionsIndex.length * 1.3);
            this.points += this.damageDealt;
            this.fullPoints += this.damageDealt;
            break;
        }
      }
      this.steps-=1;
      //Przechodzenie na poziom 2
      if(this.levelOne===true) {
        this.hpBossOne-=this.damageDealt
        if(this.hpBossOne===0 || this.hpBossOne<0) {
          this.pointsLevelOne=this.points;
          this.points=0;
          this.levelOne=false;
          this.levelTwo=true;
          this.steps+=30;
        }
      }
      //Przechodzenie na poziom 3
      if(this.levelTwo===true) {
        this.hpBossTwo-=this.damageDealt
        if(this.hpBossTwo===0 || this.hpBossTwo<0) {
          this.pointsLevelTwo=this.points;
          this.points=0;
          this.levelTwo=false;
          this.levelThree=true;
          this.steps+=30;
        }
      }
      //Przejście poziomu 3 - koniec gry
      if(this.levelThree===true) {
        this.hpBossThree-=this.damageDealt
        if(this.hpBossThree===0 || this.hpBossThree<0) {
          this.CheckHeroClass();
          this.pointsLevelThree=this.points;
          this.points=0;
          this.levelThree=false;
          this.isGameOver=true;
        }
      }
      //Koniec gry - brak kroków na poziomie 1
      if(this.levelOne==true && this.steps === 0 && this.hpBossOne >0) {
        this.CheckHeroClass();
        this.pointsLevelOne=this.points;
        this.points=0;
        this.levelOne=false;
        this.isGameOver=true;
      }
      //Koniec gry - brak kroków na poziomie 2
      if(this.levelTwo==true && this.steps === 0 && this.hpBossTwo >0) {
        this.CheckHeroClass();
        this.pointsLevelTwo=this.points;
        this.points=0;
        this.levelTwo=false;
        this.isGameOver=true;
      }
      //Koniec gry - brak kroków na poziomie 3
      if(this.levelThree==true && this.steps === 0 && this.hpBossThree >0) {
        this.CheckHeroClass();
        this.pointsLevelThree=this.points;
        this.points=0;
        this.levelThree=false;
        this.isGameOver=true;
      }


      collisionsIndex.forEach(element => {
        this.figureArray[element].figure = 'brak';
      });

      collisionsIndex.forEach(element => {
        let nextIndex = JSON.parse(JSON.stringify(element));
        while (this.figureArray[nextIndex]?.figure) {
          if (this.figureArray[nextIndex].figure !== 'brak') {
            this.figureArray[element].figure = this.figureArray[nextIndex].figure;
            this.figureArray[nextIndex].figure = 'brak';
            break;
          }
          nextIndex -= this.boardSide;
        }
      });

      const arrayLen = this.figureArray.length;
      for (let x = 1; x <= arrayLen; x++) {
        if (this.figureArray[arrayLen - x].figure === 'brak') {
          if (this.figureArray[arrayLen - x - this.boardSide]?.figure) {
            this.figureArray[arrayLen - x].figure = this.figureArray[arrayLen - x - this.boardSide].figure;
            this.figureArray[arrayLen - x - this.boardSide].figure = 'brak';
          }
        }
      }

      this.figureArray.forEach(element => {
        if (element.figure === 'brak') {
          const randomColor = Math.floor(Math.random() * this.colors.length);
          element.figure = this.colors[randomColor];
        }
      });
      return true;
    }
    else {
      return false;
    }
  }

  checkRightX(figureIndex): Array<number> {
    let isCollision = true;
    let index = JSON.parse(JSON.stringify(figureIndex));
    const collisionsIndex = [figureIndex];
    while (isCollision) {
      if (this.figureArray[figureIndex].y === this.figureArray[++index]?.y) {
        if (this.figureArray[figureIndex].figure === this.figureArray[index].figure) {
          collisionsIndex.push(index);
        }
        else {
          isCollision = false;
        }
      }
      else {
        isCollision = false;
      }
    }
    return collisionsIndex;

  }
  checkLeftX(figureIndex): Array<number> {
    let isCollision = true;
    let index = JSON.parse(JSON.stringify(figureIndex));
    const collisionsIndex = [figureIndex];
    while (isCollision) {
      if (this.figureArray[figureIndex].y === this.figureArray[--index]?.y) {
        if (this.figureArray[figureIndex].figure === this.figureArray[index].figure) {
          collisionsIndex.push(index);
        }
        else {
          isCollision = false;
        }
      }
      else {
        isCollision = false;
      }
    }
    return collisionsIndex;
  }
  checkUpY(figureIndex): Array<number> {
    let isCollision = true;
    let index = JSON.parse(JSON.stringify(figureIndex));
    const collisionsIndex = [figureIndex];
    while (isCollision) {
      index -= this.boardSide;
      if (this.figureArray[figureIndex].figure === this.figureArray[index]?.figure) {
        collisionsIndex.push(index);
      }
      else {
        isCollision = false;
      }
    }
    return collisionsIndex;
  }

  checkDownY(figureIndex): Array<number> {
    let isCollision = true;
    let index = JSON.parse(JSON.stringify(figureIndex));
    const collisionsIndex = [figureIndex];
    while (isCollision) {
      index += this.boardSide;
      if (this.figureArray[figureIndex].figure === this.figureArray[index]?.figure) {
        collisionsIndex.push(index);
      }
      else {
        isCollision = false;
      }
    }
    return collisionsIndex;
  }

  ngOnInit(): void {

  }

  getMember() {
    this.CheckHeroClass();
    this.memberService.getMember(this.user.username).subscribe(member => {
      let scoreForm = {
        heroId: this.heroId,
        userId: member.id,
        points: this.fullPoints
      }
      this.SubmitScore(scoreForm)
    })
    setTimeout(() => {this.router.navigateByUrl("/statystyki")}, 3000);
    
  }
  
  SubmitScore(scoreForm) {
    this.http.post(this.submitScorePath, scoreForm).subscribe(() => {
      console.log("sukces");
    }, error => {
      console.log(error);
    })
  }

  CheckHeroClass() {
    if (this.isMage === true) {
      this.heroId = 1;
      this.heroName = "Mag";
    }
    if (this.isWarrior === true) {
      this.heroId = 2;
      this.heroName = "Wojownik";
    }
    if (this.isArcher === true) {
      this.heroId = 3;
      this.heroName = "Łucznik";
    }
  }
}

class Figure {
  constructor(public figure: string, public x: number, public y: number, public css = '') {
  }
}
