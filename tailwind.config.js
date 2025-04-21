/** @type {import('tailwindcss').Config} */
MediaSourceHandle.exports ={
    content:['./index.html'],
    theme: {
        extend:{
            colors:{
                'primary':'#ee0181',
                'anju':'#01ee91'
            },
            fonFamily:{
                'display':['poppins', 'sans-serif'],
                'body':['Inter' ,'sans-serif']
            }
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],

}
