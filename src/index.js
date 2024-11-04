const tf = require('@tensorflow/tfjs');

// Function to generate a random population haplotype tensor
function generateRandomPopulationHaplotype(numIndividuals, numMarkers) {
  return tf.randomUniform([numIndividuals, numMarkers, 2], 0, 2, 'int32');
}

// Function to generate a random trait vector
function generateRandomTrait(numMarkers) {
  return tf.randomNormal([numMarkers]);
}

// Function to generate a gamete via recombination
function generateGamete(haplotype) {
  const crossover = tf.randomUniform([haplotype.shape[0]], 0, 2, 'int32');
  return tf.gather(haplotype, crossover, 1);
}

// Function to calculate phenotype with environmental noise
function calculatePhenotype(haplotype, trait, environmentalNoiseStd) {
  const geneticValue = tf.sum(tf.mul(haplotype, trait), 1);
  const environmentalNoise = tf.randomNormal(geneticValue.shape, 0, environmentalNoiseStd);
  return tf.add(geneticValue, environmentalNoise);
}

module.exports = {
  generateRandomPopulationHaplotype,
  generateRandomTrait,
  generateGamete,
  calculatePhenotype
};
