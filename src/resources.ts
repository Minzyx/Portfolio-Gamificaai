import { ImageFiltering, ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png"
import logoVertical from "./images/logo-vertical.png"
import backChar1 from"./images/alananpc.png"
import backChar2 from "./images/thiagonpc.png"
import backChar3 from "./images/tadeunpc.png"

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/showroom_map.tmx?url"
import { TiledResource } from "@excaliburjs/plugin-tiled";

import PlayerSpritePath from "./sprites/Bixinha.png";

import NpcASpriteSheet from "./sprites/Alana.png"
import NpcBSpriteSheet from "./sprites/Thiago.png"
import NpcCSpriteSheet from "./sprites/Tadeu.png"


export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  PlayerSpriteSheet: new ImageSource(PlayerSpritePath, { filtering: ImageFiltering.Pixel}),
  LogoVertical: new ImageSource(logoVertical),
  backChar1: new ImageSource(backChar1),
  backChar2: new ImageSource(backChar2),
  backChar3: new ImageSource(backChar3),

  NpcASpriteSheet: new ImageSource (NpcASpriteSheet),
  NpcBSpriteSheet: new ImageSource (NpcBSpriteSheet),
  NpcCSpriteSheet: new ImageSource (NpcCSpriteSheet),

  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      { path: "showroom_map.tmx", output: tmxMapaPath},
      { path: "Room_Builder_32x32.png", output: pngTilesetPath},
      { path: "tileset_paredes.tsx", output: tsxParedesPath },
      { path: "tileset_generic.tsx", output: tsxGenericPath },
      { path: "tileset_estoque.tsx", output: tsxEstoquePath },
      { path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath}
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
