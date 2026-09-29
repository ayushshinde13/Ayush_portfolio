import * as THREE from 'three';

export interface CharacterPartMetadata {
  id: string;
  name: string;
  category: string;
  description: string;
  tailorSpecs: string;
}

export const PART_METADATA: Record<string, CharacterPartMetadata> = {
  head: {
    id: 'head',
    name: 'Anatomical Head & Neck',
    category: 'Facial Anatomy',
    description: 'Chiseled jawline, balanced bone structure, and athletic neck posture.',
    tailorSpecs: 'Subsurface PBR shader, neutral expression, athletic collar fitting.',
  },
  hair: {
    id: 'hair',
    name: 'Pompadour Quiff Hairstyle',
    category: 'Grooming',
    description: 'Textured swept-back modern quiff with tapered sides and natural flow.',
    tailorSpecs: 'Specular anisotropic sheen, espresso black tint, volumetric ridges.',
  },
  sunglasses: {
    id: 'sunglasses',
    name: 'Classic Dark Sunglasses',
    category: 'Eyewear Accessories',
    description: 'Deep obsidian-tinted lenses in black acetate frame with metallic brow bar.',
    tailorSpecs: '92% tinted obsidian glass, reflective environment mapping, UV400 spec.',
  },
  shirtTie: {
    id: 'shirtTie',
    name: 'Dress Shirt & Silk Windsor Tie',
    category: 'Neckwear & Shirting',
    description: 'Crisp spread-collar poplin shirt with midnight silk tie and silver tie bar.',
    tailorSpecs: '120-two-ply Egyptian cotton, 8cm silk blade, polished palladium clip.',
  },
  jacketTorso: {
    id: 'jacketTorso',
    name: 'Tailored 2-Button Suit Jacket',
    category: 'Outerwear Torso',
    description: 'Structured shoulder silhouette, peaked lapels, chest welt pocket & flap pockets.',
    tailorSpecs: 'Super 150s Merino Wool, Italian slim cut, horsehair canvas chest piece.',
  },
  armLeft: {
    id: 'armLeft',
    name: 'Left Sleeve & French Cuff',
    category: 'Sleeve Architecture',
    description: 'Articulated sleeve draping cleanly to wrist with white cuff peeking out.',
    tailorSpecs: 'Roped sleeve head, 1.5cm shirt cuff reveal, silver cufflinks.',
  },
  armRight: {
    id: 'armRight',
    name: 'Right Sleeve & French Cuff',
    category: 'Sleeve Architecture',
    description: 'Matching right jacket sleeve with precision armhole curvature.',
    tailorSpecs: 'Roped sleeve head, 1.5cm shirt cuff reveal, silver cufflinks.',
  },
  handLeft: {
    id: 'handLeft',
    name: 'Left Hand',
    category: 'Extremities',
    description: 'Sculpted anatomical palm and articulated fingers in relaxed model stance.',
    tailorSpecs: 'Proportional finger tapering, natural relaxed flexion.',
  },
  handRight: {
    id: 'handRight',
    name: 'Right Hand',
    category: 'Extremities',
    description: 'Sculpted anatomical palm and articulated fingers in relaxed model stance.',
    tailorSpecs: 'Proportional finger tapering, natural relaxed flexion.',
  },
  pants: {
    id: 'pants',
    name: 'Tailored Formal Trousers',
    category: 'Bottomwear',
    description: 'Razor-sharp ironed center crease lines, tailored waistband, and tapered ankle hem.',
    tailorSpecs: 'Medium-rise waistband, belt loops with silver buckle, no-break hem.',
  },
  shoes: {
    id: 'shoes',
    name: 'Oxford Cap-Toe Leather Shoes',
    category: 'Footwear',
    description: 'Polished black calfskin leather dress shoes with chisel toe and stacked dress heels.',
    tailorSpecs: 'Goodyear welted sole, high-gloss mirror shine toe cap, stacked leather heel.',
  },
};

export interface CharacterMeshBuild {
  root: THREE.Group;
  parts: Record<string, THREE.Group>;
  materials: {
    skin: THREE.MeshStandardMaterial;
    hair: THREE.MeshStandardMaterial;
    suit: THREE.MeshStandardMaterial;
    suitAccent: THREE.MeshStandardMaterial;
    shirt: THREE.MeshStandardMaterial;
    tie: THREE.MeshStandardMaterial;
    shoes: THREE.MeshStandardMaterial;
    sole: THREE.MeshStandardMaterial;
    sunglassesFrame: THREE.MeshStandardMaterial;
    sunglassesLens: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
    pocketSquare: THREE.MeshStandardMaterial;
  };
  assembledPositions: Record<string, THREE.Vector3>;
  explodedPositions: Record<string, THREE.Vector3>;
}

export function createAgentCharacter(options: { suitColor?: number } = {}): CharacterMeshBuild {
  const root = new THREE.Group();
  root.name = 'AgentCharacter_Root';

  const suitHex = options.suitColor ?? 0x16171b;

  const materials = {
    skin: new THREE.MeshStandardMaterial({
      name: 'M_Skin',
      color: 0xd59f7b,
      roughness: 0.65,
      metalness: 0.05,
    }),
    hair: new THREE.MeshStandardMaterial({
      name: 'M_Hair',
      color: 0x141416,
      roughness: 0.35,
      metalness: 0.1,
    }),
    suit: new THREE.MeshStandardMaterial({
      name: 'M_SuitWool',
      color: suitHex,
      roughness: 0.72,
      metalness: 0.08,
    }),
    suitAccent: new THREE.MeshStandardMaterial({
      name: 'M_SuitLapel',
      color: suitHex,
      roughness: 0.55,
      metalness: 0.12,
    }),
    shirt: new THREE.MeshStandardMaterial({
      name: 'M_ShirtCotton',
      color: 0xfafafa,
      roughness: 0.45,
      metalness: 0.02,
    }),
    tie: new THREE.MeshStandardMaterial({
      name: 'M_SilkTie',
      color: 0x0f1012,
      roughness: 0.3,
      metalness: 0.15,
    }),
    shoes: new THREE.MeshStandardMaterial({
      name: 'M_PolishedLeather',
      color: 0x0c0d0f,
      roughness: 0.22,
      metalness: 0.18,
    }),
    sole: new THREE.MeshStandardMaterial({
      name: 'M_ShoeSole',
      color: 0x1a1a1c,
      roughness: 0.85,
      metalness: 0.05,
    }),
    sunglassesFrame: new THREE.MeshStandardMaterial({
      name: 'M_SunglassesFrame',
      color: 0x0a0a0c,
      roughness: 0.2,
      metalness: 0.3,
    }),
    sunglassesLens: new THREE.MeshStandardMaterial({
      name: 'M_SunglassesLens',
      color: 0x050508,
      roughness: 0.05,
      metalness: 0.9,
      transparent: true,
      opacity: 0.92,
    }),
    metal: new THREE.MeshStandardMaterial({
      name: 'M_SilverMetal',
      color: 0xd1d5db,
      roughness: 0.15,
      metalness: 0.95,
    }),
    pocketSquare: new THREE.MeshStandardMaterial({
      name: 'M_PocketSquare',
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.05,
    }),
  };

  const parts: Record<string, THREE.Group> = {
    head: new THREE.Group(),
    hair: new THREE.Group(),
    sunglasses: new THREE.Group(),
    shirtTie: new THREE.Group(),
    jacketTorso: new THREE.Group(),
    armLeft: new THREE.Group(),
    armRight: new THREE.Group(),
    handLeft: new THREE.Group(),
    handRight: new THREE.Group(),
    pants: new THREE.Group(),
    shoes: new THREE.Group(),
  };

  Object.entries(parts).forEach(([key, group]) => {
    group.name = `Part_${key}`;
    group.userData = { partId: key, isCharacterPart: true };
  });

  // 1. HEAD & NECK
  {
    const headGeo = new THREE.SphereGeometry(0.12, 32, 28);
    headGeo.scale(0.95, 1.15, 1.05);
    const headMesh = new THREE.Mesh(headGeo, materials.skin);
    headMesh.position.set(0, 1.72, 0);
    headMesh.castShadow = true;
    parts.head.add(headMesh);

    const jawGeo = new THREE.CylinderGeometry(0.09, 0.065, 0.12, 16);
    jawGeo.scale(1, 1, 0.85);
    const jawMesh = new THREE.Mesh(jawGeo, materials.skin);
    jawMesh.position.set(0, 1.63, 0.03);
    jawMesh.castShadow = true;
    parts.head.add(jawMesh);

    const chinGeo = new THREE.SphereGeometry(0.04, 16, 16);
    chinGeo.scale(1, 0.7, 1);
    const chinMesh = new THREE.Mesh(chinGeo, materials.skin);
    chinMesh.position.set(0, 1.57, 0.05);
    parts.head.add(chinMesh);

    const noseGeo = new THREE.ConeGeometry(0.022, 0.065, 8);
    noseGeo.rotateX(Math.PI / 4.5);
    const noseMesh = new THREE.Mesh(noseGeo, materials.skin);
    noseMesh.position.set(0, 1.70, 0.12);
    parts.head.add(noseMesh);

    [-1, 1].forEach((side) => {
      const earGeo = new THREE.SphereGeometry(0.032, 16, 14);
      earGeo.scale(0.35, 1.1, 0.65);
      const earMesh = new THREE.Mesh(earGeo, materials.skin);
      earMesh.position.set(side * 0.118, 1.70, -0.01);
      earMesh.rotation.y = side * 0.2;
      parts.head.add(earMesh);
    });

    const neckGeo = new THREE.CylinderGeometry(0.062, 0.075, 0.16, 20);
    const neckMesh = new THREE.Mesh(neckGeo, materials.skin);
    neckMesh.position.set(0, 1.53, -0.01);
    neckMesh.castShadow = true;
    parts.head.add(neckMesh);
  }

  // 2. HAIR
  {
    const hairTopGeo = new THREE.SphereGeometry(0.125, 28, 24);
    hairTopGeo.scale(1.02, 0.88, 1.12);
    const hairTop = new THREE.Mesh(hairTopGeo, materials.hair);
    hairTop.position.set(0, 1.83, -0.015);
    hairTop.castShadow = true;
    parts.hair.add(hairTop);

    const waveGeo = new THREE.CylinderGeometry(0.07, 0.11, 0.12, 16);
    waveGeo.scale(1.2, 0.7, 0.9);
    const waveMesh = new THREE.Mesh(waveGeo, materials.hair);
    waveMesh.position.set(0, 1.86, 0.05);
    waveMesh.rotation.x = -0.4;
    parts.hair.add(waveMesh);

    for (let i = -3; i <= 3; i++) {
      const ridgeGeo = new THREE.CapsuleGeometry(0.016, 0.12, 8, 12);
      const ridge = new THREE.Mesh(ridgeGeo, materials.hair);
      ridge.position.set(i * 0.024, 1.87, 0.03 - Math.abs(i) * 0.008);
      ridge.rotation.x = -0.3;
      ridge.rotation.z = -i * 0.06;
      parts.hair.add(ridge);
    }

    [-1, 1].forEach((side) => {
      const sideGeo = new THREE.BoxGeometry(0.025, 0.09, 0.06);
      const sideMesh = new THREE.Mesh(sideGeo, materials.hair);
      sideMesh.position.set(side * 0.116, 1.74, 0.01);
      parts.hair.add(sideMesh);
    });
  }

  // 3. SUNGLASSES
  {
    [-1, 1].forEach((side) => {
      const lensGeo = new THREE.BoxGeometry(0.046, 0.034, 0.01);
      const lens = new THREE.Mesh(lensGeo, materials.sunglassesLens);
      lens.position.set(side * 0.046, 1.73, 0.125);
      parts.sunglasses.add(lens);

      const rimGeo = new THREE.BoxGeometry(0.052, 0.038, 0.008);
      const rim = new THREE.Mesh(rimGeo, materials.sunglassesFrame);
      rim.position.set(side * 0.046, 1.73, 0.122);
      parts.sunglasses.add(rim);

      const armGeo = new THREE.BoxGeometry(0.006, 0.006, 0.14);
      const arm = new THREE.Mesh(armGeo, materials.sunglassesFrame);
      arm.position.set(side * 0.082, 1.73, 0.05);
      parts.sunglasses.add(arm);
    });

    const bridgeGeo = new THREE.BoxGeometry(0.032, 0.006, 0.008);
    const bridge = new THREE.Mesh(bridgeGeo, materials.sunglassesFrame);
    bridge.position.set(0, 1.735, 0.124);
    parts.sunglasses.add(bridge);

    const browGeo = new THREE.BoxGeometry(0.125, 0.005, 0.006);
    const brow = new THREE.Mesh(browGeo, materials.sunglassesFrame);
    brow.position.set(0, 1.752, 0.122);
    parts.sunglasses.add(brow);
  }

  // 4. SHIRT & TIE
  {
    const collarGeo = new THREE.CylinderGeometry(0.068, 0.076, 0.06, 20);
    const collar = new THREE.Mesh(collarGeo, materials.shirt);
    collar.position.set(0, 1.47, -0.01);
    parts.shirtTie.add(collar);

    [-1, 1].forEach((side) => {
      const tipGeo = new THREE.ConeGeometry(0.024, 0.055, 4);
      tipGeo.rotateZ(side * 0.6);
      tipGeo.rotateX(0.4);
      const tip = new THREE.Mesh(tipGeo, materials.shirt);
      tip.position.set(side * 0.042, 1.44, 0.075);
      parts.shirtTie.add(tip);
    });

    const placketGeo = new THREE.BoxGeometry(0.035, 0.32, 0.012);
    const placket = new THREE.Mesh(placketGeo, materials.shirt);
    placket.position.set(0, 1.32, 0.076);
    parts.shirtTie.add(placket);

    for (let i = 0; i < 3; i++) {
      const btnGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.004, 10);
      btnGeo.rotateX(Math.PI / 2);
      const btn = new THREE.Mesh(btnGeo, materials.shirt);
      btn.position.set(0, 1.38 - i * 0.06, 0.083);
      parts.shirtTie.add(btn);
    }

    const knotGeo = new THREE.ConeGeometry(0.026, 0.042, 5);
    knotGeo.rotateX(Math.PI);
    const knot = new THREE.Mesh(knotGeo, materials.tie);
    knot.position.set(0, 1.442, 0.082);
    parts.shirtTie.add(knot);

    const bladeGeo = new THREE.BoxGeometry(0.042, 0.28, 0.008);
    const blade = new THREE.Mesh(bladeGeo, materials.tie);
    blade.position.set(0, 1.28, 0.084);
    parts.shirtTie.add(blade);

    const tieTipGeo = new THREE.ConeGeometry(0.022, 0.032, 4);
    tieTipGeo.rotateZ(Math.PI / 4);
    tieTipGeo.rotateX(Math.PI);
    const tieTip = new THREE.Mesh(tieTipGeo, materials.tie);
    tieTip.position.set(0, 1.125, 0.084);
    parts.shirtTie.add(tieTip);

    const clipGeo = new THREE.BoxGeometry(0.038, 0.006, 0.006);
    const clip = new THREE.Mesh(clipGeo, materials.metal);
    clip.position.set(0.006, 1.31, 0.09);
    parts.shirtTie.add(clip);
  }

  // 5. SUIT JACKET TORSO
  {
    const chestGeo = new THREE.BoxGeometry(0.38, 0.28, 0.22);
    const chest = new THREE.Mesh(chestGeo, materials.suit);
    chest.position.set(0, 1.34, 0);
    chest.castShadow = true;
    parts.jacketTorso.add(chest);

    const waistGeo = new THREE.CylinderGeometry(0.175, 0.19, 0.24, 24);
    waistGeo.scale(1.08, 1, 0.65);
    const waist = new THREE.Mesh(waistGeo, materials.suit);
    waist.position.set(0, 1.12, 0);
    waist.castShadow = true;
    parts.jacketTorso.add(waist);

    [-1, 1].forEach((side) => {
      const lapelGeo = new THREE.BoxGeometry(0.065, 0.26, 0.016);
      lapelGeo.rotateZ(side * 0.22);
      const lapel = new THREE.Mesh(lapelGeo, materials.suitAccent);
      lapel.position.set(side * 0.09, 1.33, 0.114);
      lapel.castShadow = true;
      parts.jacketTorso.add(lapel);
    });

    const pocketGeo = new THREE.BoxGeometry(0.06, 0.008, 0.006);
    const pocket = new THREE.Mesh(pocketGeo, materials.suitAccent);
    pocket.position.set(-0.11, 1.36, 0.115);
    parts.jacketTorso.add(pocket);

    const psGeo = new THREE.ConeGeometry(0.018, 0.02, 4);
    const ps = new THREE.Mesh(psGeo, materials.pocketSquare);
    ps.position.set(-0.11, 1.372, 0.116);
    parts.jacketTorso.add(ps);

    [-1, 1].forEach((side) => {
      const flapGeo = new THREE.BoxGeometry(0.08, 0.018, 0.012);
      const flap = new THREE.Mesh(flapGeo, materials.suitAccent);
      flap.position.set(side * 0.14, 1.10, 0.08);
      parts.jacketTorso.add(flap);
    });

    [1.18, 1.11].forEach((yPos) => {
      const btnGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.006, 12);
      btnGeo.rotateX(Math.PI / 2);
      const btn = new THREE.Mesh(btnGeo, materials.suitAccent);
      btn.position.set(0, yPos, 0.115);
      parts.jacketTorso.add(btn);
    });
  }

  // 6. SLEEVES & ARMS
  [-1, 1].forEach((side) => {
    const armGroup = side === -1 ? parts.armLeft : parts.armRight;

    const shoulderGeo = new THREE.SphereGeometry(0.07, 16, 16);
    shoulderGeo.scale(1, 1.2, 1);
    const shoulder = new THREE.Mesh(shoulderGeo, materials.suit);
    shoulder.position.set(side * 0.22, 1.42, 0);
    shoulder.castShadow = true;
    armGroup.add(shoulder);

    const upperGeo = new THREE.CylinderGeometry(0.06, 0.054, 0.28, 18);
    upperGeo.rotateZ(side * -0.06);
    const upper = new THREE.Mesh(upperGeo, materials.suit);
    upper.position.set(side * 0.23, 1.28, 0);
    upper.castShadow = true;
    armGroup.add(upper);

    const foreGeo = new THREE.CylinderGeometry(0.054, 0.046, 0.28, 18);
    foreGeo.rotateZ(side * -0.04);
    const fore = new THREE.Mesh(foreGeo, materials.suit);
    fore.position.set(side * 0.245, 1.02, 0.01);
    fore.castShadow = true;
    armGroup.add(fore);

    const cuffGeo = new THREE.CylinderGeometry(0.044, 0.044, 0.024, 18);
    const cuff = new THREE.Mesh(cuffGeo, materials.shirt);
    cuff.position.set(side * 0.248, 0.87, 0.01);
    armGroup.add(cuff);

    const clGeo = new THREE.BoxGeometry(0.008, 0.008, 0.006);
    const cl = new THREE.Mesh(clGeo, materials.metal);
    cl.position.set(side * 0.28, 0.87, 0.01);
    armGroup.add(cl);
  });

  // 7. HANDS
  [-1, 1].forEach((side) => {
    const handGroup = side === -1 ? parts.handLeft : parts.handRight;

    const palmGeo = new THREE.BoxGeometry(0.055, 0.08, 0.028);
    const palm = new THREE.Mesh(palmGeo, materials.skin);
    palm.position.set(side * 0.25, 0.81, 0.01);
    palm.castShadow = true;
    handGroup.add(palm);

    const thumbGeo = new THREE.CapsuleGeometry(0.01, 0.038, 6, 8);
    thumbGeo.rotateZ(side * -0.5);
    const thumb = new THREE.Mesh(thumbGeo, materials.skin);
    thumb.position.set(side * 0.22, 0.81, 0.02);
    handGroup.add(thumb);

    for (let f = 0; f < 4; f++) {
      const fingerGeo = new THREE.CapsuleGeometry(0.009, 0.048, 6, 8);
      const finger = new THREE.Mesh(fingerGeo, materials.skin);
      finger.position.set(side * (0.235 + f * 0.01), 0.745, 0.01 - f * 0.002);
      handGroup.add(finger);
    }
  });

  // 8. PANTS / TROUSERS
  {
    const bandGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24);
    bandGeo.scale(1.04, 1, 0.68);
    const band = new THREE.Mesh(bandGeo, materials.suit);
    band.position.set(0, 0.99, 0);
    band.castShadow = true;
    parts.pants.add(band);

    for (let b = -2; b <= 2; b++) {
      const loopGeo = new THREE.BoxGeometry(0.008, 0.05, 0.006);
      const loop = new THREE.Mesh(loopGeo, materials.suitAccent);
      loop.position.set(b * 0.065, 0.99, 0.115 - Math.abs(b) * 0.015);
      parts.pants.add(loop);
    }

    const buckleGeo = new THREE.BoxGeometry(0.028, 0.022, 0.008);
    const buckle = new THREE.Mesh(buckleGeo, materials.metal);
    buckle.position.set(0, 0.99, 0.118);
    parts.pants.add(buckle);

    [-1, 1].forEach((side) => {
      const upperLegGeo = new THREE.CylinderGeometry(0.09, 0.076, 0.42, 20);
      const upperLeg = new THREE.Mesh(upperLegGeo, materials.suit);
      upperLeg.position.set(side * 0.10, 0.76, 0);
      upperLeg.castShadow = true;
      parts.pants.add(upperLeg);

      const lowerLegGeo = new THREE.CylinderGeometry(0.076, 0.062, 0.46, 20);
      const lowerLeg = new THREE.Mesh(lowerLegGeo, materials.suit);
      lowerLeg.position.set(side * 0.10, 0.36, 0);
      lowerLeg.castShadow = true;
      parts.pants.add(lowerLeg);

      const creaseGeo = new THREE.BoxGeometry(0.004, 0.84, 0.004);
      const crease = new THREE.Mesh(creaseGeo, materials.suitAccent);
      crease.position.set(side * 0.10, 0.55, 0.075);
      parts.pants.add(crease);

      const hemGeo = new THREE.CylinderGeometry(0.064, 0.064, 0.022, 20);
      const hem = new THREE.Mesh(hemGeo, materials.suitAccent);
      hem.position.set(side * 0.10, 0.125, 0);
      parts.pants.add(hem);
    });
  }

  // 9. DRESS SHOES
  [-1, 1].forEach((side) => {
    const shoeGeo = new THREE.BoxGeometry(0.095, 0.08, 0.22);
    shoeGeo.scale(0.85, 0.75, 1);
    const shoe = new THREE.Mesh(shoeGeo, materials.shoes);
    shoe.position.set(side * 0.10, 0.065, 0.02);
    shoe.castShadow = true;
    parts.shoes.add(shoe);

    const toeGeo = new THREE.SphereGeometry(0.046, 16, 14);
    toeGeo.scale(0.88, 0.55, 1.25);
    const toe = new THREE.Mesh(toeGeo, materials.shoes);
    toe.position.set(side * 0.10, 0.045, 0.105);
    toe.castShadow = true;
    parts.shoes.add(toe);

    const soleGeo = new THREE.BoxGeometry(0.092, 0.016, 0.23);
    const sole = new THREE.Mesh(soleGeo, materials.sole);
    sole.position.set(side * 0.10, 0.012, 0.025);
    parts.shoes.add(sole);

    const heelGeo = new THREE.BoxGeometry(0.084, 0.024, 0.07);
    const heel = new THREE.Mesh(heelGeo, materials.sole);
    heel.position.set(side * 0.10, 0.02, -0.05);
    parts.shoes.add(heel);

    for (let l = 0; l < 4; l++) {
      const laceGeo = new THREE.BoxGeometry(0.03, 0.003, 0.006);
      const lace = new THREE.Mesh(laceGeo, materials.sole);
      lace.position.set(side * 0.10, 0.085 + l * 0.004, 0.03 + l * 0.018);
      parts.shoes.add(lace);
    }
  });

  Object.values(parts).forEach((part) => root.add(part));

  const assembledPositions: Record<string, THREE.Vector3> = {
    head: new THREE.Vector3(0, 0, 0),
    hair: new THREE.Vector3(0, 0, 0),
    sunglasses: new THREE.Vector3(0, 0, 0),
    shirtTie: new THREE.Vector3(0, 0, 0),
    jacketTorso: new THREE.Vector3(0, 0, 0),
    armLeft: new THREE.Vector3(0, 0, 0),
    armRight: new THREE.Vector3(0, 0, 0),
    handLeft: new THREE.Vector3(0, 0, 0),
    handRight: new THREE.Vector3(0, 0, 0),
    pants: new THREE.Vector3(0, 0, 0),
    shoes: new THREE.Vector3(0, 0, 0),
  };

  const explodedPositions: Record<string, THREE.Vector3> = {
    head: new THREE.Vector3(0.55, 0.18, 0.05),
    hair: new THREE.Vector3(1.15, 0.22, 0.05),
    sunglasses: new THREE.Vector3(1.15, -0.05, 0.15),
    shirtTie: new THREE.Vector3(0, 0.08, 0.06),
    jacketTorso: new THREE.Vector3(0, 0, 0),
    armLeft: new THREE.Vector3(-0.48, -0.02, 0),
    armRight: new THREE.Vector3(0.48, -0.02, 0),
    handLeft: new THREE.Vector3(-0.38, -0.18, 0.08),
    handRight: new THREE.Vector3(0.38, -0.18, 0.08),
    pants: new THREE.Vector3(0, -0.28, 0),
    shoes: new THREE.Vector3(0, -0.42, 0.12),
  };

  return { root, parts, materials, assembledPositions, explodedPositions };
}

export function updateSuitColor(
  materials: { suit: THREE.MeshStandardMaterial; suitAccent: THREE.MeshStandardMaterial },
  hexColor: number
) {
  materials.suit.color.setHex(hexColor);
  materials.suitAccent.color.setHex(hexColor);
}

export function setWireframeMode(
  materials: Record<string, THREE.MeshStandardMaterial>,
  wireframe: boolean
) {
  Object.values(materials).forEach((mat) => {
    mat.wireframe = wireframe;
  });
}
