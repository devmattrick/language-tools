// Whenever a ambient declaration changes, its number should be increased
// This way, we avoid the situation where multiple ambient versions of svelte2tsx
// are loaded and their declarations conflict each other
// See https://github.com/sveltejs/language-tools/issues/1059 for an example bug that stems from it

declare module '*.svelte' {
    export default Svelte2TsxComponent
}

declare class Svelte2TsxComponent<
    Props extends {} = {},
    Events extends {} = {},
    Slots extends {} = {}
> {
    // svelte2tsx-specific
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$prop_def: Props;
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$events_def: Events;
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$slot_def: Slots;
    // https://svelte.dev/docs#Client-side_component_API
    constructor(options: Svelte2TsxComponentConstructorParameters<Props>);
    /**
     * Causes the callback function to be called whenever the component dispatches an event.
     * A function is returned that will remove the event listener when called.
     */
    $on<K extends keyof Events & string>(event: K, handler: (e: Events[K]) => any): () => void;
    /**
     * Removes a component from the DOM and triggers any `onDestroy` handlers.
     */
    $destroy(): void;
    /**
     * Programmatically sets props on an instance.
     * `component.$set({ x: 1 })` is equivalent to `x = 1` inside the component's `<script>` block.
     * Calling this method schedules an update for the next microtask — the DOM is __not__ updated synchronously.
     */
    $set(props?: Partial<Props>): void;
    // From SvelteComponent(Dev) definition
    $$: any;
    $capture_state(): void;
    $inject_state(): void;
}

interface Svelte2TsxComponentConstructorParameters<Props extends {}> {
    /**
     * An HTMLElement to render to. This option is required.
     */
    target: Element | ShadowRoot;
    /**
     * A child of `target` to render the component immediately before.
     */
    anchor?: Element;
    /**
     * An object of properties to supply to the component.
     */
    props?: Props;
    context?: Map<any, any>;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}

type AConstructorTypeOf<T, U extends any[] = any[]> = new (...args: U) => T;
type SvelteComponentConstructor<T, U extends Svelte2TsxComponentConstructorParameters<any>> = new (options: U) => T;

type SvelteActionReturnType = {
	update?: (args: any) => void,
	destroy?: () => void
} | void

type SvelteTransitionConfig = {
    delay?: number,
    duration?: number,
    easing?: (t: number) => number,
    css?: (t: number, u: number) => string,
    tick?: (t: number, u: number) => void
}

type SvelteTransitionReturnType = SvelteTransitionConfig | (() => SvelteTransitionConfig)

type SvelteAnimationReturnType = {
    delay?: number,
    duration?: number,
    easing?: (t: number) => number,
    css?: (t: number, u: number) => string,
    tick?: (t: number, u: number) => void
}

type SvelteWithOptionalProps<Props, Keys extends keyof Props> = Omit<Props, Keys> & Partial<Pick<Props, Keys>>;
type SvelteAllProps = { [index: string]: any }
type SveltePropsAnyFallback<Props> = {[K in keyof Props]: Props[K] extends undefined ? any : Props[K]}
type SvelteSlotsAnyFallback<Slots> = {[K in keyof Slots]: {[S in keyof Slots[K]]: Slots[K][S] extends undefined ? any : Slots[K][S]}}
type SvelteRestProps = { [index: string]: any }
type SvelteSlots = { [index: string]: any }
type SvelteStore<T> = { subscribe: (run: (value: T) => any, invalidate?: any) => any }

// Forces TypeScript to look into the type which results in a better representation of it
// which helps for error messages and is necessary for d.ts file transformation so that
// no ambient type references are left in the output
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type KeysMatching<Obj, V> = {[K in keyof Obj]-?: Obj[K] extends V ? K : never}[keyof Obj]
declare type __sveltets_1_CustomEvents<T> = {[K in KeysMatching<T, CustomEvent>]: T[K] extends CustomEvent ? T[K]['detail']: T[K]}

declare var process: NodeJS.Process & { browser: boolean }
declare var __sveltets_1_AnimationMove: { from: DOMRect, to: DOMRect }

declare function __sveltets_1_ensureAnimation(animationCall: SvelteAnimationReturnType): {};
declare function __sveltets_1_ensureAction(actionCall: SvelteActionReturnType): {};
declare function __sveltets_1_ensureTransition(transitionCall: SvelteTransitionReturnType): {};
declare function __sveltets_1_ensureFunction(expression: (e: Event & { detail?: any }) => unknown ): {};
declare function __sveltets_1_ensureType<T>(type: AConstructorTypeOf<T>, el: T): {};
declare function __sveltets_1_createEnsureSlot<Slots = Record<string, Record<string, any>>>(): <K1 extends keyof Slots, K2 extends keyof Slots[K1]>(k1: K1, k2: K2, val: Slots[K1][K2]) => Slots[K1][K2];
declare function __sveltets_1_ensureRightProps<Props>(props: Props): {};
declare function __sveltets_1_cssProp(prop: Record<string, any>): {};
declare function __sveltets_1_ctorOf<T>(type: T): AConstructorTypeOf<T>;
declare function __sveltets_1_instanceOf<T = any>(type: AConstructorTypeOf<T>): T;
declare function __sveltets_1_allPropsType(): SvelteAllProps
declare function __sveltets_1_restPropsType(): SvelteRestProps
declare function __sveltets_1_slotsType<Slots, Key extends keyof Slots>(slots: Slots): Record<Key, boolean>;

// Overload of the following two functions is necessary.
// An empty array of optionalProps makes OptionalProps type any, which means we lose the prop typing.
// optionalProps need to be first or its type cannot be infered correctly.

declare function __sveltets_1_partial<Props = {}, Events = {}, Slots = {}>(
    render: {props: Props, events: Events, slots: Slots }
): {props: Expand<SveltePropsAnyFallback<Props>>, events: Events, slots: Expand<SvelteSlotsAnyFallback<Slots>> }
declare function __sveltets_1_partial<Props = {}, Events = {}, Slots = {}, OptionalProps extends keyof Props = any>(
    optionalProps: OptionalProps[],
    render: {props: Props, events: Events, slots: Slots }
): {props: Expand<SvelteWithOptionalProps<SveltePropsAnyFallback<Props>, OptionalProps>>, events: Events, slots: Expand<SvelteSlotsAnyFallback<Slots>> }

declare function __sveltets_1_partial_with_any<Props = {}, Events = {}, Slots = {}>(
    render: {props: Props, events: Events, slots: Slots }
): {props: Expand<SveltePropsAnyFallback<Props> & SvelteAllProps>, events: Events, slots: Expand<SvelteSlotsAnyFallback<Slots>> }
declare function __sveltets_1_partial_with_any<Props = {}, Events = {}, Slots = {}, OptionalProps extends keyof Props = any>(
    optionalProps: OptionalProps[],
    render: {props: Props, events: Events, slots: Slots }
): {props: Expand<SvelteWithOptionalProps<SveltePropsAnyFallback<Props>, OptionalProps> & SvelteAllProps>, events: Events, slots: Expand<SvelteSlotsAnyFallback<Slots>> }


declare function __sveltets_1_with_any<Props = {}, Events = {}, Slots = {}>(
    render: {props: Props, events: Events, slots: Slots }
): {props: Expand<Props & SvelteAllProps>, events: Events, slots: Slots }

declare function __sveltets_1_with_any_event<Props = {}, Events = {}, Slots = {}>(
    render: {props: Props, events: Events, slots: Slots }
): {props: Props, events: Events & {[evt: string]: CustomEvent<any>;}, slots: Slots }

declare function __sveltets_1_store_get<T = any>(store: SvelteStore<T>): T
declare function __sveltets_1_any(dummy: any): any;
declare function __sveltets_1_empty(...dummy: any[]): {};
declare function __sveltets_1_componentType(): AConstructorTypeOf<Svelte2TsxComponent<any, any, any>>
declare function __sveltets_1_invalidate<T>(getValue: () => T): T

declare function __sveltets_1_mapWindowEvent<K extends keyof HTMLBodyElementEventMap>(
    event: K
): HTMLBodyElementEventMap[K];
declare function __sveltets_1_mapBodyEvent<K extends keyof WindowEventMap>(
    event: K
): WindowEventMap[K];
declare function __sveltets_1_mapElementEvent<K extends keyof HTMLElementEventMap>(
    event: K
): HTMLElementEventMap[K];
declare function __sveltets_1_mapElementTag<K extends keyof ElementTagNameMap>(
    tag: K
): ElementTagNameMap[K];
declare function __sveltets_1_mapElementTag<K extends keyof SVGElementTagNameMap>(
    tag: K
): SVGElementTagNameMap[K];
declare function __sveltets_1_mapElementTag(
    tag: any
): HTMLElement;

declare function __sveltets_1_bubbleEventDef<Events, K extends keyof Events>(
    events: Events, eventKey: K
): Events[K];
declare function __sveltets_1_bubbleEventDef(
    events: any, eventKey: string
): any;

declare const __sveltets_1_customEvent: CustomEvent<any>;
declare function __sveltets_1_toEventTypings<Typings>(): {[Key in keyof Typings]: CustomEvent<Typings[Key]>};

declare function __sveltets_1_unionType<T1, T2>(t1: T1, t2: T2): T1 | T2;
declare function __sveltets_1_unionType<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 | T2 | T3;
declare function __sveltets_1_unionType<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 | T2 | T3 | T4;
declare function __sveltets_1_unionType(...types: any[]): any;

declare function __sveltets_1_awaitThen<T>(
    promise: T,
    onfulfilled: (value: T extends PromiseLike<infer U> ? U : T) => any,
    onrejected?: (value: T extends PromiseLike<any> ? any : never) => any
): any;

declare function __sveltets_1_each<T extends ArrayLike<unknown>>(
    array: T,
    callbackfn: (value: T extends ArrayLike<infer U> ? U : any, index: number) => any
): any;

declare function __sveltets_1_createSvelte2TsxComponent<Props, Events, Slots>(
    render: {props: Props, events: Events, slots: Slots }
): SvelteComponentConstructor<Svelte2TsxComponent<Props, Events, Slots>,Svelte2TsxComponentConstructorParameters<Props>>;

declare function __sveltets_1_unwrapArr<T>(arr: ArrayLike<T>): T
declare function __sveltets_1_unwrapPromiseLike<T>(promise: PromiseLike<T> | T): T
