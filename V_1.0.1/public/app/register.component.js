System.register(['angular2/core', './pharma', './hero.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, pharma_1, hero_service_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pharma_1_1) {
                pharma_1 = pharma_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_heroService) {
                    this._heroService = _heroService;
                    this.types = ['24 Hora', 'Herbalist', 'Botany', 'Clinical Pharmacy'];
                    this.model = new pharma_1.Pharma('Dr IQ', "18", this.types[0]);
                    this.submitted = false;
                    this.registrado = false;
                }
                RegisterComponent.prototype.onSubmit = function () { this.submitted = true; };
                // TODO: Remove this when we're done
                RegisterComponent.prototype.registrar = function (description) {
                    var _this = this;
                    this.registrado = true;
                    this._heroService.addPharmacy(description).subscribe(function (onepharma) { return _this.onepharma = onepharma; });
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register',
                        templateUrl: 'template/register.component.html',
                        styleUrls: ["css/register.css"]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map