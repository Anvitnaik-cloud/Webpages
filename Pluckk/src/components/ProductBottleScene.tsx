"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useProduct } from "@/context/ProductContext";

export default function ProductBottleScene() {
  const { product } = useProduct();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    let isMounted = true;
    let loadedTexture: THREE.Texture | null = null;
    let loadedGeometry: THREE.BufferGeometry | null = null;
    let loadedMaterial: THREE.Material | null = null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textureLoader = new THREE.TextureLoader();
    const texturePath = `${product.framePath}025.webp`;

    textureLoader.load(texturePath, (texture: THREE.Texture) => {
      if (!isMounted) {
        texture.dispose();
        return;
      }

      loadedTexture = texture;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.anisotropy = maxAnisotropy;
      texture.needsUpdate = true;

      const geometry = new THREE.PlaneGeometry(3.2, 1.8);
      loadedGeometry = geometry;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      loadedMaterial = material;

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      renderer.render(scene, camera);
    });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (loadedTexture) loadedTexture.dispose();
      if (loadedGeometry) loadedGeometry.dispose();
      if (loadedMaterial) loadedMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [product]);

  return <div ref={mountRef} className="w-full h-full" />;
}
