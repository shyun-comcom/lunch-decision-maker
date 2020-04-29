const places = new kakao.maps.services.Places();

function getRefinedList(result) {
    const resList = [];
    result.forEach((elem) => {
        const category = elem.category_name.split(' > ');
        // if (category[1] === '술집') { continue; }
        resList.push({
            id: elem.id,
            address_name: elem.address_name,
            road_address_name: elem.road_address_name,
            category_name: category[1],
            distance: elem.distance,
            place_name: elem.place_name,
            place_url: elem.place_url,
            x: elem.x,
            y: elem.y
        });
    });

    return resList;
}

function searchPromise(latitude, longitude, page, keyword='') {
    if (keyword !== '') {
        return new Promise((resolve, reject) => {
            places.keywordSearch(keyword, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const resList = getRefinedList(result);
                    resolve(resList);
                } else {
                    resolve([]);
                }
            }, {
                category_group_code: 'FD6',
                x: longitude,
                y: latitude,
                radius: 1000,
                page
            });
        })
    } else {
        return new Promise((resolve, reject) => {
            places.categorySearch('FD6', (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const resList = getRefinedList(result);
                    resolve(resList);
                } else {
                    resolve([]);
                }
            }, {
                x: longitude,
                y: latitude,
                radius: 1000,
                page
            });
        })
    }
}

export async function getNearRestaurantList(latitude, longitude, keyword='') {
    const promises = [];
    for (var page = 1; page <= 3; page++) {
        promises.push(searchPromise(latitude, longitude, page, keyword));
    }

    const res = await Promise.all(promises);
    var restList = [];
    res.forEach((elem) => {
        var dupFlag = false;
        restList.forEach((item) => {
            if (item.id === elem[0].id) { 
                dupFlag = true;
            }
        });
        if (!dupFlag) { 
            restList = restList.concat(elem);
        }
    });
    return restList;
}