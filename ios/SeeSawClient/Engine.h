//
//  Engine.h
//  SeeSawClient
//
//  Created by Jared Tibshraeny on 2/10/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef Engine_h
#define Engine_h


#endif /* Engine_h */

#import <React/RCTBridgeModule.h>
#import "FactualEngine.h"

@interface Engine : NSObject <RCTBridgeModule, FactualDataRequestDelegate>
  @property (nonatomic, retain) NSData *_responseData;
  @property (nonatomic, retain) NSError *_responseError;
@end
