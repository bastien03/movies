exports.validate = (patchList, schema) => {
  for (const p of patchList) {
    for (const property in schema) {
      if (!p.module[property]) {
        throw new Error(`The module ${p.name} must export a property named '${property}' of type ${schema[property]}.`);
      }

      if (typeof p.module[property] !== schema[property]) {
        throw new Error(`The module ${p.name} exports '${property}' as a '${typeof p.module[property]}' but it should be a '${schema[property]}'.`);
      }
    }
  }
}
