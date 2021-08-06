import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeneralService } from '../core/genreal.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TradePlans, PlanAssetPairs, PlanTags, PlanScreenShoot } from '../models/tradePlans';
import * as jquery from 'jquery';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  public tradePlansForm: FormGroup;

  // List of Assets Pairs
  lstPlanAssetPairs: PlanAssetPairs[];
  public _selectedPlanFieldsAssetPairs: any;


  public resultPlanEntryAndAmount;
  public multiplyPlanEntry: any;
  public multiplyPlanAmount: any;

  // Collection Name Plan
  public plans = "Plans";
  public PlanImgCollection = "PlanImg";
  // List of PlanTags
  lstPlanTags: PlanTags[];

  public _selectedPlanTagsFields: any = {};
  public plansIdToDelete: any;
  lstPansData: TradePlans[];

  public ScreenPlansIdToDelete: any;
  constructor(private formBuilder: FormBuilder, private generalService: GeneralService, private router: Router
    , private firestore: AngularFirestore, private afAuth: AngularFireAuth, private storagePlans: AngularFireStorage) { }

  ngOnInit(): void {
    this.tradePlansForm = this.formBuilder.group({
      'id': [null],
      'planAssetPair': [null],
      'planSide': ['Buy'],
      'planLeverage': [null],
      'planEntry': [null],
      'createdAt': [null],
      'planProfit': [null, [Validators.max(100000)]],
      'planAmout': [null],
      'planStopLose': [null, [Validators.max(100000)]],
      'planTotal': [null],
      'planNote': [null],
      'plantags': [null],
    });
    this.getPlanAssetPairs();
    this.getPlanTags();
    this.getTradePlanList();
    this.getPlansForScreenShoot();
  }


  lstPlansForScreenShoot: PlanScreenShoot[];
  public imageShowInDialog
  // Main task 
  taskPlans: AngularFireUploadTask;
  snapshotEntries: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  // Progress monitoring
  percentage: Observable<number>;


  selectedFilesEntries: FileList;
  public getEntrieslIdForScreenShoot1;


  setsScreenIdToDelte(itemId) {
    this.ScreenPlansIdToDelete = "";
    this.ScreenPlansIdToDelete = itemId;
  }

  deleteDescriptionsByNoteJournalId() {
    // console.log(this.notesdata);
    firebase.firestore().collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid)
      .collection(this.PlanImgCollection).where('entriesId', '==', this.ScreenPlansIdToDelete ? this.ScreenPlansIdToDelete : null)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

  }

  getPlanIdForScreen(getEntriesId) {
    this.getEntrieslIdForScreenShoot1 = getEntriesId
  }

  public uploadedImageSuccessfully
  startUploadPlans(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type')
      return;
    }

    // The storage path
    const path = `tradeEntriesImages/${new Date().getTime()}_${file.name}`;
    var timestampForImage = firebase.firestore.FieldValue.serverTimestamp();


    // The main task
    this.taskPlans = this.storagePlans.upload(path, file)
    var ref = this.storagePlans.ref(path);
    // Progress monitoring
    // Progress monitoring
    this.percentage = this.taskPlans.percentageChanges();
    this.uploadedImageSuccessfully = "Uploading Image";
    this.snapshotEntries = this.taskPlans.snapshotChanges();
    // don't need this ^, but I still kept it
    this.taskPlans.snapshotChanges().subscribe(snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
        this.firestore.collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid).collection('PlanImg').add({ createdAt: timestampForImage, entriesId: this.getEntrieslIdForScreenShoot1, path, size: snap.totalBytes })
      }
    });
  }

  public getImageUrlPlans(path): Observable<any> {

    var ref = this.storagePlans.ref(path);
    return ref.getDownloadURL();


  }

  getImageUrlForShowInDialog(imgUrl) {
    this.imageShowInDialog = imgUrl;

  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  getPlansForScreenShoot() {

    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/PlanImg`, query => query.orderBy('createdAt', 'desc')).snapshotChanges().subscribe(actionArray => {
      this.lstPlansForScreenShoot = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as PlanScreenShoot

      })
      this.lstPlansForScreenShoot.forEach(element => {
        if (element.path)
          this.getImageUrlPlans(element.path).subscribe(url => {
            element.imageUrl = url;
          })
      });

    });

  }

  ngAfterViewInit() {
    (<any>jquery(".js-select2")).select2({
      allowHtml: true,
      tags: true
    });

    (<any>jquery(".js-select2")).on(
      'change',
      (e) => this._selectedPlanFieldsAssetPairs = jQuery(e.target).val()
    );

    (<any>jquery(".js-example-tokenizer")).select2({
      tags: true,
      tokenSeparators: [',', ' ']
    });

    (<any>jquery(".js-example-tokenizer")).on(
      'change',
      (e) => this._selectedPlanTagsFields = jQuery(e.target).val()
    );

    $('.showPlansList').click(function () {
      $('.with_data').show();
      $('.without_data').hide();

    });
  }

  onKeyAvgEntrytPrice(value: string) {
    this.multiplyPlanEntry = value;
    this.multiplyEntryPriceAndAmount();
  }
  onKeyAmount(value: string) {
    this.multiplyPlanAmount = value;
    this.multiplyEntryPriceAndAmount();
  }

  multiplyEntryPriceAndAmount() {
    if (this.multiplyPlanEntry && this.multiplyPlanAmount) {
      this.resultPlanEntryAndAmount = (this.multiplyPlanEntry) * (this.multiplyPlanAmount);
    }
  }
  avgEntrytPriceStopLoseMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get("planEntry").value <= group.get("planStopLose").value) {
        return { notMatching: true };
      }
    }

    return null;
  }

  avgEntrytPriceProfitMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get("planEntry").value >= group.get("planProfit").value) {
        return { notMatching: true };
      }
    }

    return null;
  }

  onTradePlansFormSubmit(form: NgForm) {
    this.tradePlansForm.controls.plantags.setValue(this._selectedPlanTagsFields);

    this.tradePlansForm.setValidators(this.avgEntrytPriceStopLoseMatchValidator);
    this.tradePlansForm.updateValueAndValidity();

    if (this.tradePlansForm.valid) {

      this.tradePlansForm.setValidators(this.avgEntrytPriceProfitMatchValidator);
      this.tradePlansForm.updateValueAndValidity();

      if (this.tradePlansForm.valid) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.tradePlansForm.controls.createdAt.setValue(timestamp);

        this.tradePlansForm.controls.planAssetPair.setValue(this._selectedPlanFieldsAssetPairs);
        if (this.tradePlansForm.controls.planAssetPair.value == null) {
          this.tradePlansForm.controls.planAssetPair.setValue("ASD - USDT");
        }

        var appTradePlans = this.tradePlansForm.value;
        var id = appTradePlans.id;
        delete appTradePlans.id;
        if (id) {
          if (this.resultPlanEntryAndAmount) {
            appTradePlans.planTotal = this.resultPlanEntryAndAmount;
          }
          this.generalService.updateData(id, appTradePlans, this.plans)
            .subscribe(res => {
              $("#dropdownPlanTag").val("");
              (<any>jquery("#dropdownPlanTag")).select2().trigger('change');
              this.tradePlansForm.reset();
              this.resultPlanEntryAndAmount = null;
              this.router.navigate(['/tradeJournal']);
            }, (err) => {
              console.log(err);
            }
            );
        }
        else {
          appTradePlans.planTotal = this.resultPlanEntryAndAmount;
          this.generalService.postData(appTradePlans, this.plans)
            .subscribe(res => {
              let id = res['key'];
              $("#dropdownPlanTag").val("");
              (<any>jquery("#dropdownPlanTag")).select2().trigger('change');
              this.tradePlansForm.reset();
              this.resultPlanEntryAndAmount = "";
              this.router.navigate(['/tradeJournal']);
            }, (err) => {
              console.log(err);
            });
        }
      }
      else {
        alert("TradePlan is not save, There is an error in the form, Profit greater than Entry Price");
      }
    }
    else {
      alert("TradePlan is not save, There is an error in the form, Stop Loss less than Entry Price");
    }

  }

  getTradePlanList() {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Plans/`, query => query.orderBy('createdAt', 'desc')).snapshotChanges().subscribe(actionArray => {
      this.lstPansData = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as TradePlans;
      })

    });

  }

  setTradePlansData(plans) {

    $("#dropdownPlanAsset").val(plans.planAssetPair);
    (<any>jquery("#dropdownPlanAsset")).select2().trigger('change');

    $("#dropdownPlanTag").val(plans.plantags);
    (<any>jquery("#dropdownPlanTag")).select2().trigger('change');

    this.multiplyPlanEntry = plans.planEntry;
    this.multiplyPlanAmount = plans.planTotal;
    this.resultPlanEntryAndAmount = plans.planTotal
    this.tradePlansForm.setValue({
      id: plans.id,
      planSide: plans.planSide,
      planAssetPair: plans.planAssetPair,
      planLeverage: plans.planLeverage,
      planEntry: plans.planEntry,
      createdAt: plans.createdAt,
      planProfit: plans.planProfit,
      planAmout: plans.planAmout,
      planStopLose: plans.planStopLose,
      planNote: plans.planNote,
      planTotal: "",
      plantags: plans.plantags,

    });
  }

  setPlansIdToDelte(itemId) {
    this.plansIdToDelete = "";
    this.plansIdToDelete = itemId;
  }

  duplicateTradePlansData(dupliatePlans) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    dupliatePlans.createdAt = timestamp;
    delete dupliatePlans.id;
    this.generalService.postData(dupliatePlans, this.plans)
      .subscribe(res => {
        let id = res['key'];
        this.router.navigate(['/tradeJournal']);
      }, (err) => {
        console.log(err);
      });

  }

  deleteTradePlans(Planid) {

    this.generalService.deleteData(Planid, this.plans)
      .subscribe(res => {
        this.deleteDescriptionsByNoteJournalId();
        this.router.navigate(['/tradeJournal']);
      }, (err) => {
        console.log(err);
      }
      );
  }



  // deleteScreenTradePlans(Planid) {

  //   this.generalService.deleteData(Planid, this.PlanImgCollection)
  //     .subscribe(res => {
  //       this.router.navigate(['/tradeJournal']);
  //     }, (err) => {
  //       console.log(err);
  //     }
  //     );
  // }

  getPlanAssetPairs() {
    this.firestore.collection('/AssetPairs').snapshotChanges().subscribe(actionArray => {
      this.lstPlanAssetPairs = actionArray.map((item: any) => {
        return {
          ...item.payload.doc.data()
        } as PlanAssetPairs
      })
    });
  }

  //  List of Plan Tag names
  getPlanTags() {
    this.firestore.collection('/Plantags').snapshotChanges().subscribe(actionArray => {
      this.lstPlanTags = actionArray.map((item: any) => {
        return {

          ...item.payload.doc.data()
        } as PlanTags
      })
    });
  }

}
