import { v4 as uuidv4 } from "uuid";
import { Layout } from "react-grid-layout";


export abstract class WidgetBuilder {

  public readonly uuid: string;
  public readonly title : string;
  public readonly href : string;
  public readonly appURL : string;
  public readonly authRequired: boolean;
  // Make sure to define this when creating sub class.
  public abstract builderClassId: string;
  public abstract layout: Layout;


  /**
   * Do not define constructor in sub class.
   * */

  public constructor(uuid: string | undefined = undefined, title ?: string, href ?: string, appURL ?: string, authRequired ?: boolean) {
    this.uuid = uuid || uuidv4(); // Generate a random uuid.
    this.title = title!==undefined ? title : '';
    this.href = href!==undefined ? href : '';
    this.appURL = appURL !== undefined ? appURL : '';
    this.authRequired = authRequired !== undefined ? authRequired : false;
  }


  /**
   * Static methods
   * */

  public static generateWidgetId(builderClassId: string) {
    return [builderClassId, uuidv4()].join("/");
  }

  public static splitWidgetId(widgetId: string) {
    const [builderClassId, uuid] = widgetId.split("/"); // Extract widget information for widget id.
    return { builderClassId, uuid };
  }


  /**
   * Methods, abstract methods, getters and setters.
   * */

  get widgetId() {
    return `${this.builderClassId}/${this.uuid}`;
  }

  public abstract build(title?: string, src?: string): JSX.Element;

}
