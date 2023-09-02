function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  C3.Plugins.NinePatch.Instance = class NinePatchInst extends (
    C3.Plugins.NinePatch.Instance
  ) {
    _Draw(...args) {
      const lm = this._leftMargin;
      const rm = this._rightMargin;
      const tm = this._topMargin;
      const bm = this._bottomMargin;
      const wi = this.GetWorldInfo();
      const seam = this._isSeamless;
      const edges = this._edges;
      const fill = this._fill;

      const edgeWi = lm + rm;
      const edgeHe = tm + bm;

      const width = wi.GetWidth();
      const height = wi.GetHeight();

      if (height < edgeHe || width < edgeWi) {
        this._isSeamless = true;
        this._edges = 1;
        this._fill = 2;
      }

      if (Math.abs(width) < edgeWi) {
        this._leftMargin = (Math.abs(width) * lm) / edgeWi;
        this._rightMargin = Math.abs(width) - this._leftMargin;
      }

      if (Math.abs(height) < edgeHe) {
        this._topMargin = (Math.abs(height) * tm) / edgeHe;
        this._bottomMargin = Math.abs(height) - this._topMargin;
      }

      if (height < Math.min(edgeHe, 2) || width < Math.min(edgeWi, 2)) {
        this._topMargin = 0;
        this._bottomMargin = 0;
        this._leftMargin = 0;
        this._rightMargin = 0;
      }

      super._Draw(...args);

      this._leftMargin = lm;
      this._rightMargin = rm;
      this._topMargin = tm;
      this._bottomMargin = bm;
      this._isSeamless = seam;
      this._edges = edges;
      this._fill = fill;
    }
  };

  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
      }
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    LoadFromJson(o) {
      // load state for savegames
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }
  };
}
