import World from './world/World.js';
import BackgroundLayer from './layers/BackgroundLayer.js';
import SpriteLayer from './layers/SpriteLayer.js';
import ForegroundLayer from './layers/ForegroundLayer.js';
import ItemManager from './ItemManager.js';
import {Point} from './math.js';
import {crop} from './Utilis/Helpers.js';

export function loadJSON(url) {
    return fetch(url)
        .then(r => r.json());
}

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function loadImages(urls) {
    let tasks = [];
    urls.forEach(url => tasks.push(loadImage(url)));
    return new Promise(resolve => {
        Promise.all(tasks).then(imagesProms => {
            resolve(imagesProms);
        });
    });
}

function loadAssets(assets) {
    let tasks = [];
    let assetItems = [];
    //assetItem = name, src, type
    for(const item of assets) {
        for(const name of item.names) {
            assetItems.push({name:name, type:item.type, src:'./img/'+item.type+'/'+name+'.png'});
        }
    }

    assetItems.forEach(item => tasks.push(loadAsset(item)));
    return new Promise(resolve => {
        Promise.all(tasks).then(assetItemsProms => {
            resolve(assetItemsProms);
        });
    });
}

function loadAsset(assetItem) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            assetItem.image = image;
            resolve(assetItem);
        });
        image.src = assetItem.src;
    });
}

function initItemManager(itemManager, assets,blocks, blockSprites, smileys, smileySprites) { //this is so fucking idiotic.
    for(const asset of assets) itemManager.addItem(asset);
    for(const pack of blocks.packs) {
        if (pack.solid == undefined) pack.solid = pack.layer == "foreground";
        for (let i = 0; i < pack.blocks.length; i++) {
            let block = pack.blocks[i]; // block
            if (pack.name != '') block.name = pack.name + ":" + block.name;
            if (block.solid == undefined) block.solid = pack.solid;
            block.layer = block.layer || pack.layer;
            block.image = crop(blockSprites, (pack.index + i) * 16, 0, 16, 16);
            itemManager.addBlock(block);
            itemManager.addBlockPack(pack);
        }
    }
    for(const frame of smileys.frames) {
        let smiley = { name: frame.name };
        smiley.image = crop(smileySprites, (frame.pos) * 26, 0, 26, 26);
        if (frame.animFramesCount) {
            smiley.frames = [];
            smiley.animtype = 'default';
            for (let i = 0; i < frame.animFramesCount; i++) {
                smiley.frames.push(crop(smileySprites, (frame.pos) * 26, i * 26, 26, 26));
                smiley.animSpeed = frame.animSpeed;
                itemManager.addSmiley(smiley);
            }
        }
        itemManager.addSmiley(smiley);
    }
}

//IM.addItem(asset)

export function loadItemManager() {
    return new Promise((resolve) => {
        const itemManager = new ItemManager();
        Promise.all([
            loadJSON('./sprites/assets.json'),
            loadJSON('./sprites/blocks.json'),
            loadJSON('./sprites/player.json')
        ]).then(([assets, blocks, smileys]) => {
            Promise.all([
                loadAssets(assets),
                loadImage(blocks.imageURL),
                loadImage(smileys.imageURL)
            ]).then(([assetItems, blockSprites, smileySprites]) => {
                initItemManager(itemManager, assetItems, blocks, blockSprites, smileys, smileySprites);
                resolve(itemManager);  
            })
        });
    });
}

function createBlocks(world, blockdata) {

    function applyRange(block, range) {
        let xs, xl = 1,
            ys, yl = 1;
        switch (range.length) {
            case 4:
                if (block.fillstyle === "border") {
                    [xs, ys, xl, yl] = range;
                    applyBorder(block, xs, ys, xl, yl);
                    return;
                }[xs, xl, ys, yl] = range;
                break;
            case 3:
                [xs, xl, ys] = range;
                break;
            case 2:
                [xs, ys] = range;
                break;
            case 1:
                [xs] = [ys] = range;
                xl = yl = 0;
                break;
        }
        const xEnd = xs + xl;
        const yEnd = ys + yl;
        for (let x = xs; x <= xEnd; x++)
            for (let y = ys; y <= yEnd; y++)
                world.setBlock({ name: block.name }, x, y, false);
    }

    function applyBorder(block, x1, y1, x2, y2) {
        for (let x = x1; x <= x2; x++) {
            world.setBlock({ name: block.name }, x, y2, false);
            world.setBlock({ name: block.name }, x, y1, false);
        }
        for (let y = y1; y <= y2; y++) {
            world.setBlock({ name: block.name }, x1, y, false);
            world.setBlock({ name: block.name }, x2, y, false);
        }
    }

    blockdata.forEach(block =>
        block.ranges.forEach(range =>
            applyRange(block, range)));
}

export function loadWorld(name) {
    return loadJSON(`./levels/${name}.json`)
    .then(worldSpec => {
        const world = new World(worldSpec);
        createBlocks(world, worldSpec.blockdata);
        const BgLayer = new BackgroundLayer(world);
        const FgLayer = new ForegroundLayer(world);
        const SpLayer = new SpriteLayer(world);

        const blocks = [...window.ItemManager.blocks.keys()];

        for (let i = 0; i < blocks.length; i++) {
            world.setBlock(window.ItemManager.formatBlock(blocks[i]), 2 + i, 2);
        }

        return world;
    });
}