const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function convertImages() {
  const baseDir = path.join(__dirname, "..", "public", "images");
  if (!fs.existsSync(baseDir)) {
    console.error("Base directory does not exist:", baseDir);
    process.exit(1);
  }

  const subdirs = fs.readdirSync(baseDir).filter((f) => {
    return fs.statSync(path.join(baseDir, f)).isDirectory();
  });

  console.log("Found image subdirectories:", subdirs);

  let totalJpgBytes = 0;
  let totalWebpBytes = 0;
  let fileCount = 0;

  for (const subdir of subdirs) {
    const dirPath = path.join(baseDir, subdir);
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".jpg"));

    console.log(`Processing directory: ${subdir} (${files.length} JPG files)`);

    for (const file of files) {
      const inputPath = path.join(dirPath, file);
      const outputFilename = file.replace(/\.jpg$/, ".webp");
      const outputPath = path.join(dirPath, outputFilename);

      const jpgSize = fs.statSync(inputPath).size;
      totalJpgBytes += jpgSize;

      // Enhance quality with sharpening and high-quality WebP encoding
      await sharp(inputPath)
        .sharpen({ sigma: 0.8, m1: 0.5, m2: 2.0 })
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);

      const webpSize = fs.statSync(outputPath).size;
      totalWebpBytes += webpSize;
      fileCount++;

      console.log(
        `Converted ${file} (${(jpgSize / 1024).toFixed(1)} KB) -> ${outputFilename} (${(
          webpSize / 1024
        ).toFixed(1)} KB)`
      );
    }
  }

  console.log("\n--- Conversion Summary ---");
  console.log(`Total files converted: ${fileCount}`);
  console.log(`Total JPG size: ${(totalJpgBytes / (1024 * 1024)).toFixed(2)} MB (${totalJpgBytes} bytes)`);
  console.log(`Total WebP size: ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB (${totalWebpBytes} bytes)`);
  const savingsPct = (((totalJpgBytes - totalWebpBytes) / totalJpgBytes) * 100).toFixed(1);
  console.log(`Size reduction: ${savingsPct}% savings`);

  // Write metrics JSON file for artifact generation
  const metrics = {
    fileCount,
    totalJpgBytes,
    totalWebpBytes,
    savingsPct: parseFloat(savingsPct),
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(__dirname, "conversion-metrics.json"),
    JSON.stringify(metrics, null, 2)
  );
}

convertImages().catch((err) => {
  console.error("Error during image conversion:", err);
  process.exit(1);
});
