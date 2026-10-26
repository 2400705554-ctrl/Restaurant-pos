(function (globalObject) {
  function normalizeBarcodeInput(raw) {
    if (raw === null || raw === undefined) return '';
    return String(raw).replace(/[\r\n\t\f\s]+/g, '').trim();
  }

  function validateBarcode(raw) {
    const value = normalizeBarcodeInput(raw);
    if (!value) return false;
    if (value.length < 3 || value.length > 128) return false;
    return /^[A-Za-z0-9]+$/.test(value);
  }

  function findProductByBarcode(products, raw) {
    const value = normalizeBarcodeInput(raw);
    if (!value || !Array.isArray(products)) return null;
    const normalizedTarget = value.toLowerCase();
    return products.find((product) => {
      if (!product) return false;
      const productKeys = [product.barcode, product.sku, product.id];
      return productKeys.some((key) => String(key || '').trim().toLowerCase() === normalizedTarget);
    }) || null;
  }

  function buildScannerContext(context) {
    const mode = String(context || 'sales').toLowerCase();
    return mode === 'purchase' || mode === 'purchases' ? 'purchase' : 'sales';
  }

  function createScannerService(options = {}) {
    const subscriptions = [];
    const isConnected = () => Boolean(options.connected ?? true);

    const notify = (event, payload) => {
      subscriptions.forEach((listener) => {
        try {
          listener(event, payload);
        } catch (error) {
          console.warn('Barcode scanner listener failed:', error);
        }
      });
    };

    return {
      normalizeBarcodeInput,
      validateBarcode,
      findProductByBarcode,
      buildScannerContext,
      on(event, listener) {
        if (typeof listener !== 'function') return;
        subscriptions.push((incomingEvent, payload) => {
          if (incomingEvent === event) listener(payload);
        });
      },
      handleBarcode(barcode, context, extra = {}) {
        const normalizedInput = normalizeBarcodeInput(barcode);
        const scannerContext = buildScannerContext(context);
        const selectedProducts = Array.isArray(extra.products) ? extra.products : options.products || [];

        if (!validateBarcode(normalizedInput)) {
          notify('barcode:error', { barcode: normalizedInput, context: scannerContext, message: 'Invalid barcode format.' });
          return { ok: false, barcode: normalizedInput, context: scannerContext, reason: 'invalid', product: null };
        }

        if (!isConnected()) {
          notify('barcode:error', { barcode: normalizedInput, context: scannerContext, message: 'Scanner disconnected.' });
          return { ok: false, barcode: normalizedInput, context: scannerContext, reason: 'disconnected', product: null };
        }

        const product = findProductByBarcode(selectedProducts, normalizedInput);
        if (!product) {
          notify('barcode:not-found', { barcode: normalizedInput, context: scannerContext, message: 'Product not found.' });
          return { ok: false, barcode: normalizedInput, context: scannerContext, reason: 'not-found', product: null };
        }

        notify('barcode:success', { barcode: normalizedInput, context: scannerContext, product, message: `Added ${product.name}.` });
        return { ok: true, barcode: normalizedInput, context: scannerContext, reason: 'success', product };
      }
    };
  }

  const behavior = {
    normalizeBarcodeInput,
    validateBarcode,
    findProductByBarcode,
    buildScannerContext,
    createScannerService
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = behavior;
  }

  globalObject.BarcodeScanner = behavior;
})(typeof globalThis !== 'undefined' ? globalThis : this);
