export const axisVertexShader = `
    precision lowp float;
    
    attribute vec2 aPos;
    
    void main() {
    
        gl_Position = vec4(aPos, 1., 1.);
    }
`;

export const axisFragmentShader = `
    precision lowp float;
    
    void main() {
        gl_FragColor = vec4(
            vec3(0.),
            1.
        );
    }
`;