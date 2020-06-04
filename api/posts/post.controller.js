"use strict";

const index = function index(req, res) {
    return res.status(200).json([{
            "id": "1",
            "postedBy": "Jesus",
            "title": "Eliminar Main.storyboard de tu aplicación iOS",
            "body": "Por defecto, todos los proyectos iOS que son creados vienen con una pantalla inicial Main.storyboard. Este storyboard representa la vista de otro archivo por defecto que viene en nuestro proyecto (ViewController.swift).",
            "image": "https://i.imgur.com/sVh6ua6.png"
        },
        {
            "id": "2",
            "postedBy": "Abigail",
            "title": "MagazineLayout: CollectionViews con mucha flexibilidad",
            "body": "MagazineLayout es una librería desarrollada y usada por AirBnB para facilitar el trabajo con CollectionViews. La ventaja principal en mi opinion, es la facilidad que nos da para darle diferentes tamaños a las celdas CollectionViewCells. Utilizando propiedades de tamaños predefinidas como por ejemplo .fullWidth // ocupa toda su superview .halfWidth // ocupa la mitad de su superview",
            "image": "https://i.imgur.com/5H1DIXb.png"
        },
        {
            "id": "3",
            "postedBy": "CafeDude",
            "title": "Introducción al proyecto: Instalación de Carthage y SnapKit",
            "body": "Una habilidad muy importante como desarrollador iOS es saber crear vistas de manera programática, para ello voy a usar SnapKit, aunque todo lo que haremos será sencillo y puede ser implementado con APIs nativas de Apple, me parece que usar SnapKit puede incrementar la facilidad para leer el código. Ademas, es una de las librerías mas famosas de iOS para AutoLayout.",
            "image": "https://camo.githubusercontent.com/31e716ea5f9dcf84442b4a908c4751e39f45aa47/687474703a2f2f736e61706b69742e696f2f696d616765732f62616e6e65722e6a7067"
        }
    ]);
     
};

module.exports = {
    index
};