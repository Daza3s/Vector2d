class Vector2d {
    
    static fromCoords(x1,y1,x2,y2) {
        let x = x2 - x1;
        let y = y2 - y1;
        let ret = new Vector2d(x,y);
        return ret;
    }

    static fromAB(vec1, vec2) {
        let ret = new Vector2d(vec2.x - vec1.x, vec2.y - vec1.y);
        return ret;
    }

    static dist(vec1, vec2) {
        let x = vec2.x - vec1.x;
        let y = vec2.y - vec1.y;

        let ret = Math.sqrt(x*x + y*y);
        return ret;
    }

    static angle(vec1, vec2) {
        let ret = vec1.dot(vec2);
        ret = ret / (vec1.length() * vec2.length());
        ret = Math.acos(ret);
        return ret;
    }

    static vecToGradient(vec) {
        return Math.atan2(vec.x,vec.y);
    }

    static intersect(p1,p2,p3,p4) {
        let m1 = (p2.y-p1.y) / (p2.x-p1.x);
        let b1 = p1.y - m1 * p1.x;

        let m2 = (p4.y-p3.y) / (p4.x-p3.x);
        let b2 = p3.y - m2 * p3.x;

        if(m1 === Infinity || m1 === -Infinity) {
            let x1High = Math.max(p1.x, p2.x);
            if(p3.x > x1High && p4.x > x1High) return false;

            let x1Low = Math.min(p1.x, p2.x);
            if(p3.x < x1Low && p4.x < x1Low) return false;

            let y1High = Math.max(p1.y,p2.y);
            if(p3.y > y1High && p4.y > y1High) return false;

            let y1Low = Math.min(p1.y, p2.y);
            if(p3.y < y1Low && p4.y < y1Low) return false;

            /*
                now we know there is an intersect
            */

            if(m2 === 0) {
                return new Vector2d(p1.x,p3.y);
            }else if(m2 === Infinity || m2 === -Infinity) {
                return new Vector2d(p3.x,p3.y);
            }

            /*
                now we know m1 is vertical and that m2 is neither horizontal nor vertical 

                so we know x to be either p1.x or p2.x (which are the same)
            */
           let x = p1.x;
           let y = m2 * x + b2; //put in x to get y
            
           return new Vector2d(x,y);
        }

        //Repeat for case m2 is +/-infinity
        if(m2 === Infinity || m2 === -Infinity) {
            let x2High = Math.max(p3.x,p4.x);
            if(p1.x > x2High && p2.x > x2High) return false;

            let x2Low = Math.min(p3.x, p4.x);
            if(p1.x < x2Low && p2.x < x2Low) return false;

            let y2High = Math.max(p3.y,p4.y);
            if(p1.y > y2High && p2.y > y2High) return false;

            let y2Low = Math.min(p3.y, p4.y);
            if(p1.y < y2Low && p2.y < y2Low) return false;

            if(m1 === 0) {
                return new Vector2d(p3.x, p1.y);
            }//cant be infinity (already checked)

            let x = p3.x;
            let y = m1 * x + b1;

            return new Vector2d(x,y);
        }

        let x = (b2 - b1) / (m1 - m2);
        let y = m1 * x + b1;

        let inter = new Vector2d(x,y);

        let vec12 = Vector2d.fromAB(p1,p2);
        let vec34 = Vector2d.fromAB(p3,p4);

        /**
         * () + t() = ()
         * () + u() = () 
         */

        let vec1 = inter.sub(p1);
        let vec2 = inter.sub(p3);

        let t = vec1.x / vec12.x;
        let u = vec2.x / vec34.x;

        if(t >= 0 && t <= 1 && u >= 0 && u <= 1) return inter;

        return false;
    }
    
    
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        let ret = new Vector2d(this.x + vec.x, this.y + vec.y);
        return ret;
    }

    sub(vec) {
        let ret = new Vector2d(this.x - vec.x, this.y - vec.y);
        return ret;
    }

    multNum(num) {
        let ret = new Vector2d(this.x * num, this.y * num);
        return ret;
    }

    divNum(num) {
        let ret = new Vector2d(this.x / num, this.y / num);
        return ret;
    }

    multVec(vec) {
        let ret = new Vector2d(this.x * vec.x, this.y * y);
        return ret;
    }

    dot(vec) {
        let ret = this.x * vec.x + this.y * vec.y;
        return ret;
    }

    divVec(vec) {
        let ret = new Vector2d(this.x / vec.x, this.y / vec.y);
        return ret;
    }

    length() {
        let ret = Math.sqrt(this.x * this.x + this.y * this.y);
        return ret;
    }

    normalize() {
        let len = this.length();
        let ret = new Vector2d(this.x / len, this.y / len);
        return ret;
    }

    resize(num) {
        let ret = this.normalize();
        ret = ret.multNum(num);
        return ret;
    }

    normalVec() {
        let ret = new Vector2d(this.y, -this.x);
        return ret;
    }

    dreh(radiants) {

        //Dreh Matrix
        /**
         * |x11 x12| * Vector2d
         * |x21 x22|
         */
        let x11 = Math.cos(radiants);
        let x12 = -Math.sin(radiants);
        let x21 = Math.sin(radiants);
        let x22 = Math.cos(radiants);

        let x = x11 * this.x + x12 * this.y;
        let y = x21 * this.x + x22 * this.y;

        let ret = new Vector2d(x,y);

        return ret;
    }

    toString() {
        return `x: ${this.x}
y: ${this.y}`;
    }
}

export { Vector2d }