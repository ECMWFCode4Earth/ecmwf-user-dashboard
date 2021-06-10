/**
 * Widget Builder Abstract Class
 * */

import { Layout } from "react-grid-layout";


export abstract class WidgetBuilder {

  public readonly key: string;
  public abstract layout: Layout;

  private rebuildTrigger: () => void;

  protected constructor(key?: string) {
    this.key = key || ("w" + Date.now()); // If key not provide, generate a random id using w appended with Date.now()
    this.rebuildTrigger = () => undefined;
  }

  public setLayout(layout: Layout) {
    this.layout = layout;
  }

  public setRebuildTrigger(rebuildTrigger: () => void) {
    this.rebuildTrigger = rebuildTrigger;
  }

  public abstract build(): JSX.Element;

  public rebuild() {
    this.rebuildTrigger();
  }

}