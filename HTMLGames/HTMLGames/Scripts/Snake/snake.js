; (function () {
    console.log('Snake game started...');

    class Random {
        static get(start, end) {
            return Math.floor((Math.random() * end) + start);
        }
    }

    class Food {

        constructor(x, y) {
            this.x = x;
            this.y = y;

            this.width = 10;
            this.height = 10;
        }

        static generate() {
            return new Food(Random.get(0, canvas.width), Random.get(0, canvas.height));
        }

        draw() {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Square {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.back = null //Previous square

            this.width = 10;
            this.height = 10;
        }

        draw() {
            context.fillRect(this.x, this.y, this.width, this.height);
            if (this.hasBack())
                this.back.draw();
        }

        add() {
            if (this.hasBack()) return this.back.add();
            this.back = new Square(this.x, this.y, 10, 10);
        }

        hasBack() {
            return this.back !== null;
        }

        right() {
            this.copy();
            this.x += 10;
        }

        left() {
            this.copy();
            this.x -= 10;
        }

        up() {
            this.copy();
            this.y -= 10;
        }

        down() {
            this.copy();
            this.y += 10;
        }

        copy() {
            if (this.hasBack()) {
                this.back.copy();
                this.back.x = this.x;
                this.back.y = this.y;
            }
        }
    }

    class Snake {
        constructor() {
            this.head = new Square(100, 0);
            this.draw();
            this.direction = "right";
            this.head.add();
            this.head.add();
            this.head.add();
        }

        draw() {
            this.head.draw();

        }

        right() {
            this.direction = "right";
        }

        left() {
            this.direction = "left";
        }

        up() {
            this.direction = "up";
        }

        down() {
            this.direction = "down";
        }

        move() {
            if (this.direction === "up") return this.head.up();
            if (this.direction === "down") return this.head.down();
            if (this.direction === "right") return this.head.right();
            if (this.direction === "left") return this.head.left();
        }

        eat() {
            this.head.add();
        }
    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var snake = new Snake();
    var foods = [];

    window.addEventListener('keydown', function (ev) {
        if (ev.keyCode > 36 && ev.keyCode < 41)
            ev.preventDefault();

        if (ev.keyCode === 40) return snake.down();
        if (ev.keyCode === 39) return snake.right();
        if (ev.keyCode === 38) return snake.up();
        if (ev.keyCode === 37) return snake.left();

        return false;
    });

    setInterval(function () {
        snake.move();
        context.clearRect(0,0,canvas.width,canvas.height);
        snake.draw();
        drawFood();
    }, 1000 / 5); //5 ejecuciones de la funcion por segundo

    setInterval(function () {
        var food = Food.generate();
        foods.push(food);

        setTimeout(function () {
            removeFromFoods(food);
        }, 10000);

    }, 4000);



    function drawFood() {
        for (const index in foods) {
            const food = foods[index];

            if (typeof food !== "undefined") {
                food.draw();
                if (hit(food, snake.head)) {
                    snake.eat();
                    removeFromFoods(food);
                }
            }
        }
    }

    function removeFromFoods(f) {
        foods = foods.filter(function (food) {
            return food !== f;
        })
    }

    function hit(a, b) {
        var hit = false;
        //Colisiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }

        //Colision de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }

        return hit;
    }

})();



