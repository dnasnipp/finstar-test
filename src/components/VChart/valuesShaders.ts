export const valuesVertexShader = `
    precision lowp float;
    
    attribute vec2 aPos;
    attribute float aCol;
    
    varying float vCol;
    
    void main() {
        
        vCol = aCol;
        
        gl_Position = vec4(aPos, 1., 1.);
    
    }
`;

export const valuesFragmentShader = `
    precision lowp float;
    
    varying float vCol;

    void main() {

        vec3 color = vec3(1., 0., 0.);

        if(vCol == 1.) {
            color = vec3(0.,1.,0.);
        }

        gl_FragColor = vec4(color, .9);
    
    }
`;