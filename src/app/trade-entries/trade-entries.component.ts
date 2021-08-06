import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { GeneralService } from '../core/genreal.service';
import { Router } from '@angular/router';
import { AssetPairs, TradeEntries, EntryTags, ExitTags, TradeManagement, TradeScreenShoot } from '../models/tradeEntries';
import * as jquery from 'jquery';

import { Observable, combineLatest, of, SubscriptionLike } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash'
import { FilterByEntryId } from '../models/filter';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { TradePlans } from '../models/tradePlans';

@Component({
  selector: 'app-trade-entries',
  templateUrl: './trade-entries.component.html',
  styleUrls: ['./trade-entries.component.scss']
})
export class TradeEntriesComponent implements OnInit {

  public tradeEntriesForm: FormGroup;

  lstEntriesData: TradeEntries[];
  // Collection Name
  public entriesCollection = "Entries";
  public tradeManagementCollection = "TradeManagement";
  public tradeScreenShootCollection = "EntriesImg"
  public tradePlansCollection = "Plans";
  // Trade Management
  public tradeManagementForm: FormGroup;
  public getEntrieslIdForTradeManagement;
  // TradeManagement List
  lstTradeManagement: TradeManagement[];
  lstEntriesForScreenShoot: TradeScreenShoot[];
  // Object Duplicate the Trade Management against Trade Entries start
  // public lstTradeManagementForDuplicate: TradeManagement[];
  // Object Duplicate the Trade Management against Trade Entries End

  // List of Assets Pairs
  lstAssetPairs: AssetPairs[];
  public _selectedFieldsAssetPairs: any;
  public entriesIdToDelete: any;

  //Tags TradeManagement List
  lstEntryTags: EntryTags[];
  lstExitTags: ExitTags[];

  public _selectedEntryTags: any = {};
  public _selectedExitTags: any = {};

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService, private router: Router
    , private firestore: AngularFirestore, private afAuth: AngularFireAuth, private storageEntries: AngularFireStorage) { }

  ngOnInit(): void {
    this.getTradeEntriesList();
    this.getAssetPairs();
    this.getEntryTags();
    this.getExitTags();
    this.getTradeManagement();
    this.getEntriesForScreenShoot();
    this.getTradePlanListForEntries();
    this.ShowPlanListForEntries();
    this.tradeEntriesForm = this.formBuilder.group({
      'id': [null],
      'leverage': [null],
      'avgEntrytPrice': [null],
      'createdAt': [null],
      'stopLose': [null, [Validators.max(100000)]],
      'amout': [null],
      'avgClosePrice': [null],
      'total': [null],
      'fees': [null],
      'assetPair': [null],
      'Side': ['Buy'],
      'planId': [""]
    });

    this.tradeManagementForm = this.formBuilder.group({

      'entriesId': [null],
      'noteTitle': [null],
      'createdAt': [null],
      'entryTags': [null],
      'exitTags': [null],
    });

    $(".check_form input:checkbox").click(function () {

      $(".import_trade .plan_title.check_trade_entry").toggleClass("check_sel", !$(".check_form input:checkbox").is(":checked"));
      $(".import_trade .uncheck_trade").toggleClass("uncheck_sel", $(".check_form input:checkbox").is(":checked"));

    });
    $(".trade_check_form input:radio").click(function () {

      $(".import_plan .plan_title.check_trade_entry").toggleClass("check_sel", !$(".trade_check_form input:checkbox").is(":checked"));

    });
  }

  ngAfterViewChecked() {
    $(".check_form input:checkbox").click(function () {

      $(".import_trade .plan_title.check_trade_entry").toggleClass("check_sel", !$(".check_form input:checkbox").is(":checked"));
      $(".import_trade .uncheck_trade").toggleClass("uncheck_sel", $(".check_form input:checkbox").is(":checked"));

    });
    $(".trade_check_form input:radio").click(function () {

      $(".import_plan .plan_title.check_trade_entry").toggleClass("check_sel", !$(".trade_check_form input:radio").is(":checked"));

    });
  }
  ngAfterViewInit() {

    // var mainlis = $('#accordion'); // cache selector
    // mainlis.on('click', function (e) {
    //   e.preventDefault();
    //   var me = $(this);
    //   mainlis.hide();
    //   me.show();
    // });


    (<any>jquery(".js-select2")).select2({
      allowHtml: true,
      tags: true
    });

    (<any>jquery(".js-select2")).on(
      'change',
      (e) => this._selectedFieldsAssetPairs = jQuery(e.target).val()
    );

    (<any>jquery(".js-example-tokenizerEntry")).on(
      'change',
      (e) => this._selectedEntryTags = jQuery(e.target).val()
    );

    (<any>jquery(".js-example-tokenizerEntry")).select2({
      tags: true,
      tokenSeparators: [',', ' ']
    });

    (<any>jquery(".js-example-tokenizerExit")).on(
      'change',
      (e) => this._selectedExitTags = jQuery(e.target).val()
    );

    (<any>jquery(".js-example-tokenizerExit")).select2({
      tags: true,
      tokenSeparators: [',', ' ']
    });

    $('.showTradeList').click(function () {
      $('.with_data').show();
      $('.without_data').hide();

    });
  }
  public resultEntryPriceAndAmount;
  public multiplyAvgEntrytPrice: any;
  public multiplyAmount: any;




  public imageShowInDialog
  // Main task 
  taskEntries: AngularFireUploadTask;
  snapshotEntries: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  // Progress monitoring
  percentage: Observable<number>;


  selectedFilesEntries: FileList;
  public getEntrieslIdForScreenShoot1;

  lstPansDataForEntries: TradePlans[];
  selectedHobby: any = []
  lstShowPlansForEntries: TradePlans[] = [];

  public childData: any = [];
  public parentData: any = [];

  public fireStoreSubscription: SubscriptionLike;
  public ParentDataSubscription: SubscriptionLike


  ShowPlanListForEntries() {
    this.fireStoreSubscription = this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Entries/`, query => query.orderBy('createdAt', 'desc'))
      .snapshotChanges().subscribe(actionArray => {

        this.parentData = actionArray.map((item: any) => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as TradeEntries
        })


        this.parentData.forEach(element => {
          this.ParentDataSubscription = this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Plans/`, query => query.orderBy('createdAt', 'desc'))
            .snapshotChanges().subscribe(actionArray1 => {

              this.childData = actionArray1.map((item: any) => {
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data()
                } as TradePlans
              })


              // this.lstShowPlansForEntries= [];
              this.childData.forEach(elementEntries => {
                if (element.planId == elementEntries.id) {
                  var variabc = this.lstShowPlansForEntries.find(p => p.id == elementEntries.id)
                  if (!variabc) {
                    this.lstShowPlansForEntries.push(elementEntries);
                  }

                  // elementEntries.planId
                }
              });
            });

          // this.lstShowPlansForEntries.push(element);


        });
        // this.ParentDataSubscription.unsubscribe();
      });
    // this.fireStoreSubscription.unsubscribe();

  }

  // getEntriesData(getEntries) {
  //   console.log("Farooq")
  //  console.log(this.lstShowPlansForEntries);
  //   // this.lstShowPlansForEntries.foreach(element => {
  //   //   if(element.id === getEntries.planId){
  //   //    return element
  //   //   }
  //   // });

  // }




  getEntries(getEntries) {

    this.tradeManagementForm.controls.entriesId.setValue(getEntries.id);
    this.getEntrieslIdForTradeManagement = getEntries;

    this.getTradeManagement();


  }

  getTradePlanListForEntries() {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Plans/`, query => query.orderBy('createdAt', 'desc')).snapshotChanges().subscribe(actionArray => {
      this.lstPansDataForEntries = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as TradePlans;
      })
      console.log("Plan for entries")
      console.log(this.lstPansDataForEntries);
    });

  }

  public planIdForImport
  onImportPlan() {
    var planSelectId = this.planIdForImport;
    var getEntries = this.getEntrieslIdForTradeManagement;
    var entId = getEntries.id
    getEntries.planId = planSelectId;
    this.generalService.updateData(entId, getEntries, this.entriesCollection)
      .subscribe(res => {
        this.getTradePlanListForEntries();
        //   $(".import_icon").click(function() {

        //     $(".import_plan .plan_title.check_trade_entry").toggleClass("check_sel", !$(".import_icon"));

        //  });
      }, (err) => {
        console.log(err);
      }
      );
  }

  PlanChange(event) {
    let index = this.selectedHobby.indexOf(event.target.value)
    if (index == -1) {
      this.planIdForImport = event.target.value;
    }
  }

  onCancelPlan() {
    this.getTradePlanListForEntries();
  }
  // hobbyChange(event){
  //   let index = this.selectedHobby.indexOf(event.target.value)
  //   if(index == -1){
  //     this.selectedHobby.push(event.target.value)

  //   }
  //   else{
  //     this.selectedHobby.splice (index,1)
  //   }
  //   console.log(this.selectedHobby)
  // }


  getEntriesIdForScreen(getEntriesId) {
    this.getEntrieslIdForScreenShoot1 = getEntriesId


  }

  detectFilesEntries(event) {
    this.selectedFilesEntries = event.target.files;
  }
  public uploadedImageSuccessfully
  startUploadEntries(event: FileList) {
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
    this.taskEntries = this.storageEntries.upload(path, file)
    var ref = this.storageEntries.ref(path);
    // Progress monitoring
    // Progress monitoring
    this.percentage = this.taskEntries.percentageChanges();
    this.uploadedImageSuccessfully = "Uploading Image";
    this.snapshotEntries = this.taskEntries.snapshotChanges();
    // don't need this ^, but I still kept it
    this.taskEntries.snapshotChanges().subscribe(snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
        this.firestore.collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid).collection('EntriesImg').add({ createdAt: timestampForImage, entriesId: this.getEntrieslIdForScreenShoot1, path, size: snap.totalBytes })
      }
    });
  }

  public getImageUrlEntries(path): Observable<any> {

    var ref = this.storageEntries.ref(path);
    return ref.getDownloadURL();


  }

  getImageUrlForShowInDialog(imgUrl) {
    this.imageShowInDialog = imgUrl;

  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }










  avgEntrytPriceStopLoseMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get("avgEntrytPrice").value <= group.get("stopLose").value) {
        return { notMatching: true };
      }
    }

    return null;
  }
  onKeyAvgEntrytPrice(value: string) {
    this.multiplyAvgEntrytPrice = value;
    this.multiplyEntryPriceAndAmount();
  }
  onKeyAmount(value: string) {
    this.multiplyAmount = value;
    this.multiplyEntryPriceAndAmount();
  }

  multiplyEntryPriceAndAmount() {
    if (this.multiplyAvgEntrytPrice && this.multiplyAmount) {
      this.resultEntryPriceAndAmount = (this.multiplyAvgEntrytPrice) * (this.multiplyAmount);
    }
  }

  onTradeEntriesFormSubmit(form: NgForm) {

    this.tradeEntriesForm.setValidators(this.avgEntrytPriceStopLoseMatchValidator);
    this.tradeEntriesForm.updateValueAndValidity();
    if (this.tradeEntriesForm.valid) {

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      this.tradeEntriesForm.controls.createdAt.setValue(timestamp);
      this.tradeEntriesForm.controls.assetPair.setValue(this._selectedFieldsAssetPairs);
      if (this.tradeEntriesForm.controls.assetPair.value == null) {
        this.tradeEntriesForm.controls.assetPair.setValue("ASD - USDT");
      }
      var appTradeEntries = this.tradeEntriesForm.value;
      var id = appTradeEntries.id;
      delete appTradeEntries.id;
      if (id) {
        if (this.resultEntryPriceAndAmount) {
          appTradeEntries.total = this.resultEntryPriceAndAmount;
        }
        this.generalService.updateData(id, appTradeEntries, this.entriesCollection)
          .subscribe(res => {
            this.tradeEntriesForm.reset();
            this.resultEntryPriceAndAmount = null;
            // this.router.navigate(['/tradeJournal']);
          }, (err) => {
            console.log(err);
          }
          );
      }
      else {
        appTradeEntries.total = this.resultEntryPriceAndAmount;
        this.generalService.postData(appTradeEntries, this.entriesCollection)
          .subscribe(res => {
            let id = res['key'];
            this.tradeEntriesForm.reset();
            this.resultEntryPriceAndAmount = "";
            // this.router.navigate(['/tradeJournal']);
          }, (err) => {
            console.log(err);
          });
      }
    }

    else {
      alert("Trade Journal is not save, There is an error in the form, Stop Loss less than Entry Price");
    }

  }

  setTradeEntriesData(entries) {
    // this.tradeEntriesForm.patchValue(entries);
    $("#dropdownAsset").val(entries.assetPair);
    // this.tradeEntriesForm.controls.Side.setValue(entries.Side);

    (<any>jquery("#dropdownAsset")).select2().trigger('change');
    this.multiplyAvgEntrytPrice = entries.avgEntrytPrice;
    this.multiplyAmount = entries.amout;
    // Ye 
    this.resultEntryPriceAndAmount = entries.total
    this.tradeEntriesForm.setValue({
      id: entries.id,
      createdAt: entries.createdAt,
      avgEntrytPrice: entries.avgEntrytPrice,
      leverage: entries.leverage,
      stopLose: entries.stopLose,
      amout: entries.amout,
      avgClosePrice: entries.avgClosePrice,
      total: "",
      fees: entries.fees,
      Side: entries.Side,
      assetPair: entries.assetPair,
      planId: entries.planId,

    });
  }


  duplicateTradeEntriesData(dupliateEntries) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    dupliateEntries.createdAt = timestamp;
    delete dupliateEntries.id;
    this.generalService.postData(dupliateEntries, this.entriesCollection)
      .subscribe(res => {
        let id = res['key'];
        // this.router.navigate(['/tradeJournal']);
        // this.tradeEntriesForm.controls.leverage.setValue("");
        // this.tradeEntriesForm.controls.avgEntrytPrice.setValue("");
        // this.tradeEntriesForm.controls.stopLose.setValue("");
        // this.tradeEntriesForm.controls.amout.setValue("");
        // this.tradeEntriesForm.controls.avgClosePrice.setValue("");
        // this.tradeEntriesForm.controls.total.setValue("");
        // this.tradeEntriesForm.controls.fees.setValue("");
        // this.tradeEntriesForm.controls.assetPair.setValue("");
      }, (err) => {
        console.log(err);
      });

  }

  // Duplicate the Trade Management against Trade Entries start
  // duplicateTradeEntriesData(dupliateEntries) {
  //   const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //   dupliateEntries.createdAt = timestamp;
  //   this.getTradeManagementForDuplicate(dupliateEntries.id);
  //   delete dupliateEntries.id;

  //   this.generalService.postData(dupliateEntries, this.entries)
  //     .subscribe(res => {
  //       let id = res['key'];

  //       this.lstTradeManagementForDuplicate.forEach(childObj => {
  //         childObj.entriesId = id;
  //         delete childObj.id;
  //         this.generalService.postData(childObj, this.tradeManagementCollection)
  //           .subscribe(res => {
  //             let id = res['key'];
  //             this.router.navigate(['/tradeJournal']);
  //           }, (err) => {
  //             console.log(err);
  //           });
  //       })

  //       this.router.navigate(['/tradeJournal']);
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  // Duplicate the Trade Management against Trade Entries End

  setEntriesIdToDelte(itemId) {
    this.entriesIdToDelete = "";
    this.entriesIdToDelete = itemId;
  }
  getTradeEntriesList() {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Entries/`, query => query.orderBy('createdAt', 'desc')).snapshotChanges().subscribe(actionArray => {
      this.lstEntriesData = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as TradeEntries;
      })

    });

  }
  public getEntriesIdForDeleteManagement
  deleteTradeEntries(Tradeid) {
    this.getEntriesIdForDeleteManagement = Tradeid;
    this.generalService.deleteData(Tradeid, this.entriesCollection)
      .subscribe(res => {
        this.deleteDescriptionsByNoteId();
        this.deleteScreenShootByEntriesId();
        // this.router.navigate(['/tradeJournal']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  deleteDescriptionsByNoteId() {
    firebase.firestore().collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid)
      .collection(this.tradeManagementCollection).where('entriesId', '==', this.getEntriesIdForDeleteManagement ? this.getEntriesIdForDeleteManagement : null)
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

  deleteScreenShootByEntriesId() {
    firebase.firestore().collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid)
      .collection(this.tradeScreenShootCollection).where('entriesId', '==', this.getEntriesIdForDeleteManagement ? this.getEntriesIdForDeleteManagement : null)
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

  public isClick = false;





  onTradeManagementFormSubmit(form: NgForm) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    this.tradeManagementForm.controls.createdAt.setValue(timestamp);
    this.tradeManagementForm.controls.entryTags.setValue(this._selectedEntryTags);
    this.tradeManagementForm.controls.exitTags.setValue(this._selectedExitTags);
    var apptradeManagementForm = this.tradeManagementForm.value;
    this.generalService.postData(apptradeManagementForm, this.tradeManagementCollection)
      .subscribe(res => {
        debugger
        let id = res['key'];
        $("#entrydropdown").val("");
        (<any>jquery("#entrydropdown")).select2().trigger('change');

        $("#exitdropdown").val("");
        (<any>jquery("#exitdropdown")).select2().trigger('change');

        // $("#myModal").modal("hide");
        // this.router.navigate(['/tradeJournal']);
      }, (err) => {
        console.log(err);
      });
  }
  // List Duplicate the Trade Management against Trade Entries start
  // getTradeManagementForDuplicate(getEntriesId) {
  //   this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/TradeManagement`, query => query.orderBy('createdAt', 'desc').where('entriesId', '==', getEntriesId ? getEntriesId : null)).snapshotChanges().subscribe(actionArray => {
  //     this.lstTradeManagementForDuplicate = actionArray.map((item: any) => {
  //       return {
  //         id: item.payload.doc.id,
  //         ...item.payload.doc.data()
  //       } as TradeManagement

  //     })

  //   });
  // }
  // List Duplicate the Trade Management against Trade Entries End

  getTradeManagement() {
    this.isClick = false
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/TradeManagement`, query => query.orderBy('createdAt', 'desc')).snapshotChanges().subscribe(actionArray => {
      this.lstTradeManagement = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as TradeManagement

      })

      if (this.lstTradeManagement.length > 0) {
        this.isClick = true
      }
    });
    console.log(this.lstTradeManagement);
  }

  getEntriesForScreenShoot() {

    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/EntriesImg`, query => query.orderBy('createdAt', 'desc')).snapshotChanges().subscribe(actionArray => {
      this.lstEntriesForScreenShoot = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as TradeScreenShoot

      })
      this.lstEntriesForScreenShoot.forEach(element => {
        if (element.path)
          this.getImageUrlEntries(element.path).subscribe(url => {
            element.imageUrl = url;
          })
      });

    });

  }

  getAssetPairs() {
    this.firestore.collection('/AssetPairs').snapshotChanges().subscribe(actionArray => {
      this.lstAssetPairs = actionArray.map((item: any) => {
        return {
          ...item.payload.doc.data()
        } as AssetPairs
      })
    });
  }

  //  List of Tag name
  getEntryTags() {
    this.firestore.collection('/TradeManagement').snapshotChanges().subscribe(actionArray => {
      this.lstEntryTags = actionArray.map((item: any) => {
        return {
          ...item.payload.doc.data()
        } as EntryTags
      })
    });
  }

  getExitTags() {
    this.firestore.collection('/TradeManagement').snapshotChanges().subscribe(actionArray => {
      this.lstExitTags = actionArray.map((item: any) => {
        return {
          ...item.payload.doc.data()
        } as ExitTags
      })
    });
  }

  public dropCont: string = "";
  public actionBox2: string = "";
  public ToggleClass() {
    this.actionBox2 = this.actionBox2 ? "" : "open";
    this.dropCont = this.dropCont ? "" : "open";
  }
}
