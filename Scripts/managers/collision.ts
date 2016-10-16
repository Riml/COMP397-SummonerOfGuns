module managers {
    export class Collision {

      

        constructor() {
            this.start();
        }

        public start() {

        }

        public update() {

        }

        public check(coll:objects.GameObject, objColliding:objects.GameObject) {
            // Check distance between LASER and enemy
            if(coll.collisionEnter==true || objColliding.collisionEnter == true)
                return;

            if(coll.tl_corner.x < objColliding.tr_corner.x &&
                coll.tl_corner.x > objColliding.tl_corner.x && 
                coll.tr_corner.y < objColliding.bl_corner.y &&
                coll.br_corner.y > objColliding.tl_corner.y) {
                    console.log("Destruction time");
                    this.destroy(objColliding);
                    this.destroy(coll);
                    coll.collisionEnter=true;
                    objColliding.collisionEnter = true;
            }


            /*
            let tempDist = objects.Vector2.distance(obj1.position, obj2.position);

            if(tempDist < (obj1.width * 0.5 + obj2.width)) {
                if(obj1.name == "enemy") {
                    this.destroy(obj1)
                }
                if(obj2.name == "enemy") {
                    this.destroy(obj2);
                }
            }
            */
        }

        private destroy(objToDestroy : objects.GameObject) : void {
            objToDestroy.destroy();
        }
    }
}