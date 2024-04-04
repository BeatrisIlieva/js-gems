const uniqid = require("uniqid");
const earrings = [
    {
        id: "1wpi161xlujt4jpl",
        name: "Earring1",
        description: "Desc 1",
        price: "5",
        imageUrl: "https://res.cloudinary.com/deztgvefu/image/upload/v1703258159/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-1_csp0lg.webp",
        
    },
    {
        id: "2wpi161xlujt4jpl",
        name: "Earring2",
        description: "Desc 2",
        price: "10",
        imageUrl: "https://res.cloudinary.com/deztgvefu/image/upload/v1703258159/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-1_csp0lg.webp",
        
    }
];

exports.getAll = (search, from, to) => {
    let result = earrings.slice();

    if (search) {
        result = result.filter(earring => earring.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (from) {
        result = result.filter(earring => earring.price >= Number(from));
    }

    if (to) {
        result = result.filter(earring => earring.price <= Number(to));
    }

    return result;
};

exports.getOne = (earringId) => earrings.find(x => x.id = earringId);

exports.create = (earringData) => {
    const newEarring = {
        id: uniqid(),
        ...earringData,
    };

    earrings.push(newEarring);

    return newEarring;
};