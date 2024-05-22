import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { HomePage } from './home.page';
import { AssetService } from '../shared/services/asset.service';
import { Asset } from '../shared/models/asset.model';
import { of, throwError } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let assetService: jasmine.SpyObj<AssetService>;
  let alertController: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    const assetServiceSpy = jasmine.createSpyObj('AssetService', ['getAll']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AssetService, useValue: assetServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    assetService = TestBed.inject(AssetService) as jasmine.SpyObj<AssetService>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load assets on ionViewWillEnter', () => {
    const mockAssets: Asset[] = [{ id: '1', name: 'Asset 1', type: 'test', locationId: '1', locationName: "location 1", image: 'testing' }];
    assetService.getAll.and.returnValue(of(mockAssets));

    component.ionViewWillEnter();

    expect(component.assets).toEqual(mockAssets);
  });

});
