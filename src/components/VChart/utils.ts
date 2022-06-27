import {stepsFragmentShader, stepsVertexShader} from "@/components/VChart/stepsShader";

export const convertUsualCoordsToGL = (x: number, y: number) => {
    return 1;
}

export const convertGLCoordsToUsual = (x: number, y: number) => {
    return 1;
}

export const getProgram = (gl: WebGLRenderingContext, vertexShaderSrc: string, fragmentShaderSrc: string): WebGLProgram | null => {
    const vertexShader =  gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if(!vertexShader || !fragmentShader) return null;

    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.shaderSource(fragmentShader, fragmentShaderSrc);

    let msg: string | null = null;

    gl.compileShader(vertexShader);
    msg = msg = gl.getShaderInfoLog(vertexShader);

    if(msg) {
        console.error(msg);
        return null;
    }

    gl.compileShader(fragmentShader);
    msg = gl.getShaderInfoLog(fragmentShader);

    if(msg) {
        console.error(msg);
        return null;
    }

    const program = gl.createProgram();

    if(!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program);

    msg = gl.getProgramInfoLog(program)
    if(msg) {
        console.error(msg);
        return null;
    }

    return program;
}

export const getMeshPlane = (xPos: number, yPos: number, x2Pos: number, y2Pos: number) => {
    return [
    ];
}

import {axisVertexShader, axisFragmentShader} from "@/components/VChart/axisShaders";

export const getAxisController = (gl: WebGLRenderingContext) => {
    const program = getProgram(gl, axisVertexShader, axisFragmentShader);
    if(!program) return;

    gl.useProgram(program);

    const bufferData = [
        -1., -1.,
        1., -1.,
        -1., -1.,
        -1., 1.
    ];

    const vertexCount = bufferData.length/2;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);

    const vertPointer = gl.getAttribLocation(program, 'aPos');
    gl.vertexAttribPointer(vertPointer, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT*2, 0);
    gl.enableVertexAttribArray(vertPointer);

    return {
        draw: () => {
            gl.useProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(vertPointer, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT*2, 0);

            gl.drawArrays(gl.LINES, 0, vertexCount);
        }
    }
}

export const getStepsController = (gl: WebGLRenderingContext) => {
    const program = getProgram(gl, stepsVertexShader, stepsFragmentShader);
    if(!program) return;

    gl.useProgram(program);

    let stepsCount = 3;
    let bufferData: number[] = [];

    const calculateBufferData = () => {
        const newBufferData = [];
        const stepSize = 2/stepsCount;

        for(let i = 0; i < stepsCount; i++) {
            //             STEP WITH OFFSET           CONVERT COORDS       1 PIXEL TO FIX CROP
            const yPos = ( stepSize + stepSize*i )       - 1 -            2/gl.canvas.height;

            newBufferData.push(-1);
            newBufferData.push(yPos);

            newBufferData.push(1);
            newBufferData.push(yPos);
        }

        bufferData = newBufferData;
    }
    calculateBufferData();

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);

    const vertPointer = gl.getAttribLocation(program, 'aPos');
    gl.vertexAttribPointer(vertPointer, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT*2, 0);
    gl.enableVertexAttribArray(vertPointer);

    return {
        draw: () => {
            gl.useProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(vertPointer, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT*2, 0);

            gl.drawArrays(gl.LINES, 0, bufferData.length/2);
        },
        setStepsCount: (count: number) => {
            if(stepsCount === count) return;
            stepsCount = count;

            calculateBufferData();

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
        }
    }
}

export const getValueController = (gl: WebGLRenderingContext) => {
    return 1;
}