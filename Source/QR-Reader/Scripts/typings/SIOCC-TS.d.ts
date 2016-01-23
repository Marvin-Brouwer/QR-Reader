declare module ioc {
    /**
     * A base class for applications using an IOC Container
     */
    abstract class ApplicationContext implements IApplicationContext {
        /**
         * A base class for applications using an IOC Container
         * @param appName The name of your application
         */
        constructor(appName: string);
        /**
         * A handle to access the ApplicationContext from anywhere in the application
         */
        static applicationContext: IApplicationContext;
        /**
         * A method to override where you register your intances into the IOC Container
         * @param container The IOC container created for this ApplicationContext
         * @returns {}
         */
        register(container: Container): void;
    }
}

declare module ioc {
    /**
     * The IOC Container
     */
    class Container {
        private static container;
        private registeredInstances;
        private registeredScripts;
        private appName;
        /**
         * The IOC Container
         * @param appName The name of your application
         * @param baseNamespace
         */
        constructor(appName: string);
        /**
         * Get the currently assigned IOC Container
         */
        static getCurrent(): Container;
        /**
         * Get the name of the ApplicationContext this IOC container is made from
         */
        getAppName(): string;
        /**
         * Register an instance type
         * @param type The full namespace of the type you want to instantiate
         */
        register<T>(type: Function): InstanceRegistry<T>;
        /**
         * Resolve the registered Instance
         * @param type The full namespace of the type you want to resolve
         */
        resolve<T>(type: Function): T;
    }
}

declare module ioc {
    /**
     * A helper class for aquiring animation methods
     */
    class AnimationHelper {
        /**
         * Get the animationframe
         * @param callback Function to call on AnimationFrame
         */
        static getAnimationFrame(callback: FrameRequestCallback): number;
        /**
         * Cancel an animationFrameEvent
         * @param requestId The handle of the event you want to cancel
         */
        static cancelAnimationFrame(requestId: number): void;
    }
}

declare module ioc {
    interface IApplicationContext {
        /**
         * A method to override where you register your intances into the IOC Container
         * @param container The IOC container created for this ApplicationContext
         * @returns {}
         */
        register(container: Container): void;
    }
}

declare module ioc {
    /**
     * A base class for libraries using an IOC Container
     * This is used to provide an easy way to register all the libraries components
     */
    abstract class LibraryContext {
        /**
         * A method to override where you register your intances into the IOC Container
         * @param container The IOC container created for the ApplicationContext of the using app
         * @returns {}
         */
        static register(container: Container): void;
    }
}

declare module ioc {
    interface IRegistryBase<T> {
        /**
         * Set the type of this Registry
         * @param type The full type of the Instance you want to register
         * @returns {}
         */
        setType(type: Function): IRegistryBase<T>;
        /**
         * Return the Instance
         * @returns {}
         */
        getInstance(): T;
        /**
         * Get the type of this Registry
         * @returns {}
         */
        getType(): Function;
        /**
         * Set a function fo modify Instance that will be called directly after instantiating
         * @param resolve The function to call when resolving
         * @returns {}
         */
        setResolveFunc(resolve: (instance: T) => T): IRegistryBase<T>;
        /**
         * Set a function to resolve the object in a different way than a parameterless constructor
         * @param instantiate The function used to Instantiate the object
         * @returns {}
         */
        setInstantiateFunc(instantiate: () => T): IRegistryBase<T>;
        /**
         * Apply a lifetimescope to this Registry
         * @param lifetime The lifetimescope to apply to
         */
        setLifetimeScope(lifetime: LifetimeScope): IRegistryBase<T>;
    }
}

declare module ioc {
    /**
     * Registry for standard Instances
     */
    class InstanceRegistry<T> extends RegistryBase<T> {
        protected lifeTimeScope: LifetimeScope;
        protected callers: {
            [key: string]: any;
        };
        /**
         * Return the Instance
         * @returns {}
         */
        getInstance(): T;
        /**
         * Instantiate the object
         */
        protected instantiate(): void;
        /**
         * Apply a lifetimescope to this Registry
         * @param lifetime The lifetimescope to apply to
         */
        setLifetimeScope(lifetime: LifetimeScope): IRegistryBase<T>;
    }
}

declare module ioc {
    /**
     * The available lifetime scopes
     */
    enum LifetimeScope {
        /**
         * Resolve everytime the Resolve is called
         */
        PerResolveCall = 0,
        /**
         * Allow only one Instance of this type
         */
        SingleInstance = 1,
        /**
         * Return only one Instance for every dependency
         */
        PerDependency = 2,
    }
}

declare module ioc {
    /**
     * A base class to provide basic functionality for al Registries
     */
    class RegistryBase<T> implements IRegistryBase<T> {
        protected type: Function;
        protected object: any;
        protected initiated: boolean;
        protected loaded: boolean;
        protected resolveFunc: (instance: T) => any;
        protected instantiateFunc: () => T;
        /**
         * Return the Instance
         * @returns {}
         */
        getInstance(): T;
        /**
         * Get the type of this Registry
         * @returns {}
         */
        getType(): Function;
        /**
         * Set the type of this Registry
         * @param type The full type of the Instance you want to register
         * @returns {}
         */
        setType(type: Function | T): IRegistryBase<T>;
        /**
         * Method to override that Instantiates the object
         */
        protected instantiate(): void;
        /**
         * Set a function fo modify Instance that will be called directly after instantiating
         * @param resolve The function to call when resolving
         * @returns {}
         */
        setResolveFunc(resolve: (instance: T) => T): IRegistryBase<T>;
        /**
         * Set a function to resolve the object in a different way than a parameterless constructor
         * @param instantiate The function used to Instantiate the object
         * @returns {}
         */
        setInstantiateFunc(instantiate: () => T): IRegistryBase<T>;
        /**
         * Apply a lifetimescope to this Registry
         * @param lifetime The lifetimescope to apply to
         */
        setLifetimeScope(lifetime: LifetimeScope): IRegistryBase<T>;
    }
}


//# sourceMappingURL=SIOCC-TS.d.ts.map